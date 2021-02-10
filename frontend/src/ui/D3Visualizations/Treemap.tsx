import { Typography } from '@material-ui/core';
import * as d3 from 'd3';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Occupation } from '../../domain/occupation';
import { State } from '../../domain/state';
import { majorLookup, Transition } from '../../domain/transition';
import { colorDomainMajorOccCodes, colorRange } from './colorSchemes';
import ToolTip from './ToolTip';
import TreemapKey from './TreemapKey';
import useResizeObserver from './useResizeObserver';
import { CaptionText } from './TreemapSubComponents';

const Container = styled.div`
  width: 90vw;
  height: 70vh;
  align-self: center;
`;

const Svg = styled.svg``;

const textFontSize = 18;
const percentFontSize = 20;
const white = '#ffffff';

export type CategoryNode = {
  name: string;
  children: Transition[];
  category: number;
};
export type TreeRootNode = { children: CategoryNode[] };
export type TreeNode = TreeRootNode | CategoryNode | Transition;

export type TreemapProps = {
  selectedOccupation: Occupation;
  selectedState?: State;
  data: Transition[];
};

const groupData = (data: Transition[]): TreeRootNode => {
  let categories: any[] = [];

  majorLookup.forEach((name, categoryKey) => {
    const transitions = data.filter(node => categoryKey === category(node));

    if (transitions.length > 0) {
      categories.push({
        name: name,
        children: transitions,
        category: categoryKey,
      });
    }
  });

  return {
    children: categories,
  };
};

function isTransition(node: TreeNode): node is Transition {
  return (node as Transition).transitionRate !== undefined;
}

function name(node: TreeNode): string {
  return isTransition(node) ? node.name : '';
}

function transitionRate(node: TreeNode): number {
  return isTransition(node) ? node.transitionRate : 0;
}

function code(node: TreeNode): string {
  return isTransition(node) ? node.code : '0';
}

export function category(node: TreeNode): number {
  return isTransition(node) ? parseInt(node.code.slice(0, 2)) : 0;
}

export default function Treemap({
  data,
  selectedOccupation,
  selectedState,
}: TreemapProps) {
  const occName = selectedOccupation ? selectedOccupation.name : '';
  const occCode = selectedOccupation ? selectedOccupation.code : '';

  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);
  const svgRef = useRef<SVGSVGElement>(null);

  const [hoveredInfo, setHoveredInfo] = useState();
  const [selectedInfo, setSelectedInfo] = useState();

  useEffect(() => {
    containerRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, []);

  const renderTreemap = useCallback(() => {
    let hoveredCode: string | undefined;
    let selectedCode: string | undefined;
    let selectedNode: any;

    const mouseover = (d: any, i: any) => {
      d.stopPropagation();

      const targetNode = d3.select(d.currentTarget);
      const targetCode = code(i.data);

      if (selectedCode !== targetCode) {
        targetNode.style('stroke-width', '2px');
      }

      if (hoveredCode !== targetCode) {
        i.data.category = majorLookup.get(parseInt(code(i.data).slice(0, 2)));
        setHoveredInfo(i);
        hoveredCode = targetCode;
      }

      toolTipContainerDiv
        .style('left', i.x0 + (i.x1 - i.x0) / 2 - 150 + 'px')
        .style('top', i.y0 + 'px');
      // .style('width', i.x1 - i.x0 + 'px')

      toolTipDiv
        .style('height', 'auto')
        .style('width', '100%')
        .style('left', 'auto')
        .style('margin', 'auto')
        .html(name(i.data));

      tooltip
        .transition()
        .style('visibility', 'visible')
        .transition()
        .attr('transform', `translate(0 -10)`)
        .style('opacity', '1')
        .duration(500)
        .ease(d3.easeCubicInOut);
    };

    const mouseout = (d: any, i: any) => {
      const targetNode = d3.select(d.currentTarget);
      const targetCode = code(i.data);
      if (selectedCode !== targetCode) {
        targetNode.style('stroke-width', '0');
      }
      setHoveredInfo(undefined);
      hoveredCode = undefined;
      tooltip
        .transition()
        .duration(250)
        .attr('transform', 'translate(0 10)')
        .style('opacity', '0')
        .ease(d3.easeCubicInOut)
        .transition()
        .style('visibility', 'hidden');
    };

    const click = (d: any, i: any) => {
      const targetNode = d3.select(d.currentTarget);
      const targetCode = code(i.data);
      if (selectedCode === targetCode) {
        targetNode.style('stroke-width', '2px');
        setSelectedInfo(undefined);
        selectedCode = undefined;
      } else {
        selectedNode?.style('stroke-width', 0);
        targetNode.style('stroke-width', '3px');
        i.data.category = majorLookup.get(parseInt(code(i.data).slice(0, 2)));
        setSelectedInfo(i);
        selectedCode = targetCode;
        selectedNode = targetNode;
      }
    };

    // clear previous svg children renderings
    d3.select(svgRef.current).selectAll('g').remove();

    // create svg
    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    const dataset = groupData(data);

    // create hierarchical layout with data
    const root = d3
      .hierarchy(dataset)
      .sum(transitionRate)
      .sort((a, b) => b.value! - a.value!);

    // initialize treemap
    const treemapRoot = d3
      .treemap<TreeNode>()
      .size([dimensions.width, dimensions.height])
      .padding(1)(root);

    // select the nodes and set x, y position
    const nodes = svg
      .selectAll('g')
      .data(treemapRoot.leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    const colorScaleMajorOccupation = d3
      .scaleQuantile<string>()
      .domain(colorDomainMajorOccCodes)
      .range(colorRange);

    // create and fill svg 'rects' based on the node data selected
    nodes
      .append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => colorScaleMajorOccupation(category(d.data)) || white)
      .style('stroke-linejoin', 'round')
      .style('stroke', '#2878C8')
      .on('click', click)
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .style('stroke-width', d => 0);

    // add node labels
    const textHolder = nodes.append('g');

    textHolder
      .append('text')
      .attr('pointer-events', 'none')
      .text(d => `${name(d.data)}`)
      .attr('data-width', d => d.x1 - d.x0)
      .attr('font-size', `${textFontSize}px`)
      .attr('font-weight', 400)
      .style('fill', 'black')
      .style('text-align', 'top')
      .attr('x', 18)
      .attr('y', textFontSize + 8);

    const percentHolder = nodes.append('g');

    percentHolder
      .append('text')
      .attr('pointer-events', 'none')
      .text(d => `${Math.round(transitionRate(d.data) * 10000) / 100}%`)
      .attr('y', textFontSize + 8)
      .attr('height', textFontSize + 8)
      .attr('data-width', d => d.x1 - d.x0)
      .style('text-align', 'top')
      .attr('font-size', `${percentFontSize}px`)
      .attr('font-weight', 700)
      .style('fill', 'black')
      .attr('transform', `translate(${18}, ${percentFontSize * 1.2})`);

    // tooltip group/container
    const tooltip = svg
      .append('g')
      .style('visibility', 'hidden')
      .style('z-index', 10)
      .attr('pointer-events', 'none');

    const toolTipObj = tooltip
      .append('foreignObject')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .style('position', 'relative');

    const toolTipContainerDiv = toolTipObj
      .append('xhtml:div')
      .style('position', 'absolute')
      .style('height', '70px')
      .style('width', '300px')
      .style('padding', '6px 12px');

    const toolTipDiv = toolTipContainerDiv
      .append('xhtml:div')
      .style('background-color', 'white')
      .style('border-radius', '5px')
      .style('text-align', 'center')
      .style('margin', '50px')
      .html('tooltext');

    // wrap node labels if necessary
    function wrap(selection: d3.Selection<SVGTextElement, any, any, any>) {
      selection.each(function () {
        const node = d3.select(this);
        const width = +node.attr('data-width');
        let word: string;
        const words: Array<string> = node.text().split(' ').reverse();
        let line: Array<string> = [];
        let lineNumber = 0;
        const x = node.attr('x');
        const y = node.attr('y');
        const dy = 0;
        // overwrite current text for node with '' and append empty tspan
        let tspan: d3.Selection<SVGTSpanElement, any, any, any> = node
          .text('')
          .append('tspan')
          .attr('x', x)
          .attr('y', y);
        while (words.length > 1) {
          word = words.pop()!;
          line.push(word);
          tspan.text(line.join(' '));
          const tspanLength = tspan.node()?.getComputedTextLength?.() ?? 0;
          if (tspanLength > width) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = addTspan(word);
          }
        }
        // add transition rate as last tspan
        const rateSpan = addTspan(words.pop()!);
        rateSpan.style('fill', 'black');
        function addTspan(
          text: string
        ): d3.Selection<SVGTSpanElement, any, any, any> {
          return node
            .append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', ++lineNumber * textFontSize + dy + 'px')
            .text(text);
        }
      });
    }
  }, [dimensions.width, dimensions.height, data]);

  useLayoutEffect(() => {
    renderTreemap();
  }, [renderTreemap]);

  const title = `Job transitions from ${occName} (${occCode}) ${
    selectedState ? `move to in ${selectedState.name}?` : `move to Nationally?`
  }`;

  const footnote_blurb = `This visualization shows the occupations which ${occName} move to when they change occupation. The transition share is the proportion of ${occName} who move into a job in each other occupation when they switch jobs. We only break out individual occupations with transition shares greater than 0.2%.`;

  const occCategoryList = new Set<number>();

  data.forEach(item => {
    occCategoryList.add(category(item));
  });

  return (
    <Container ref={containerRef} data-testid="treemap">
      <div>
        <Typography
          variant="h6"
          style={{ marginTop: '12px', marginBottom: '12px' }}
        >
          {title}
        </Typography>
        <Svg ref={svgRef} />
        <ToolTip info={hoveredInfo || selectedInfo} />
        <TreemapKey
          occupationCodes={occCategoryList}
          footnote_blurb={footnote_blurb}
        />
      </div>
    </Container>
  );
}
