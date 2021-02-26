import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import * as d3 from 'd3';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Occupation } from '../../domain/occupation';
import { State } from '../../domain/state';
import { majorLookup, Transition } from '../../domain/transition';
import ToolTip from './ToolTip';
import useResizeObserver from './useResizeObserver';

const Container = styled.div`
  width: 90vw;
  height: 70vh;
  align-self: center;
`;

const Svg = styled.svg``;

const fontSize = 12;
const white = '#ffffff';

// these two arrays must match item for item - index for index - this is how the colors are assigned in the D3 color scale
const colorRange = [
  '#2E96FC',
  '#31B39F',
  '#5DC2B3',
  '#73B9FE',
  '#766CFB',
  '#8DD5CA',
  '#958DFA',
  '#A2D0FD',
  '#C1BFFE',
  '#D0E7FF',
  '#D0EEE9',
  '#DA8FC7',
  '#DFDDFE',
  '#F79FE0',
  '#FEA333',
  '#FEB95D',
  '#FECE8B',
  '#FED1DE',
  '#FEE1BA',
  '#FF4782',
  '#FF74A1',
  '#FFA3C0',
  '#FFD0F3',
];

const colorDomainMajorOccCodes = [
  11,
  13,
  15,
  17,
  19,
  21,
  23,
  25,
  27,
  29,
  31,
  33,
  35,
  37,
  39,
  41,
  43,
  45,
  47,
  49,
  51,
  53,
  55,
];

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
  display: string;
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

function category(node: TreeNode): number {
  return isTransition(node) ? parseInt(node.code.slice(0, 2)) : 0;
}

function hourlyPay(node: TreeNode): number {
  return isTransition(node) ? node.hourlyPay : 0;
}

export default function Treemap({
  display,
  data,
  selectedOccupation,
  selectedState,
}: TreemapProps) {
  const occName = selectedOccupation ? selectedOccupation.name : '';
  const occCode = selectedOccupation ? selectedOccupation.code : '';

  const title = `Which occupations do ${occName} (${occCode}) ${
    selectedState ? `move to in ${selectedState.name}?` : `move to Nationally?`
  }`;

  const footnote_blurb = `This visualization shows the occupations which ${occName} move to when they change occupation. The transition share is the proportion of ${occName} who move into a job in each other occupation when they switch occupation. We only break out individual occupations with transition shares greater than 0.2%.`;

  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);
  const svgRef = useRef<SVGSVGElement>(null);

  const [hoveredInfo, setHoveredInfo] = useState();
  const [selectedInfo, setSelectedInfo] = useState();

  console.log('from Treemap: Display=', display);

  useEffect(() => {
    containerRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, []);

  const renderTreemap = useCallback(() => {
    let hoveredCode: string | undefined;
    let selectedCode: string | undefined;
    let selectedNode: any;

    const mouseover = (d: any, i: any) => {
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
    };

    const mouseout = (d: any, i: any) => {
      const targetNode = d3.select(d.currentTarget);
      const targetCode = code(i.data);
      if (selectedCode !== targetCode) {
        targetNode.style('stroke-width', '0');
      }
      setHoveredInfo(undefined);
      hoveredCode = undefined;
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
    const hourlyArray: number[] = [];
    dataset.children.forEach(e => {
      hourlyArray.push(e.category);
    });

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

    function maxVal() {
      const hrPayArray: number[] = [];
      dataset.children.forEach(child => {
        child.children.forEach(e => {
          hrPayArray.push(e.hourlyPay);
        });
      });
      console.log('maxVal:', d3.max(hrPayArray));
      return d3.max(hrPayArray);
    }

    const opacity = d3
      .scaleLinear()
      .domain([5, maxVal() || 100])
      .range([0.2, 1]);

    const toggleCategorySalary = (d: any, toggle: string) => {
      const opacValue = toggle === 'opacity' ? opacity(hourlyPay(d.data)) : 1;

      const colorValue =
        toggle === 'fill'
          ? colorScaleMajorOccupation(category(d.data))
          : '#3EB56D';

      // return {opacity: opacValue, color: colorValue};
      return `opacity: ${opacValue}; fill: ${colorValue}`;
    };

    // create and fill svg 'rects' based on the node data selected
    nodes
      .append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('stroke-linejoin', 'round')
      .style('stroke', '#2878C8')
      .on('click', click)
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .style('stroke-width', d => 0)
      .attr('style', d => toggleCategorySalary(d, display));

    // add node labels
    nodes
      .append('text')
      .text(
        d =>
          `${name(d.data)} ${Math.round(transitionRate(d.data) * 10000) / 100}%`
      )
      .attr('data-width', d => d.x1 - d.x0)
      .attr('font-size', `${fontSize}px`)
      .style('fill', '#165085')
      .style('text-align', 'top')
      .attr('x', 3)
      .attr('y', fontSize)
      .call(wrap);

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
            .attr('dy', ++lineNumber * fontSize + dy + 'px')
            .text(text);
        }
      });
    }
  }, [dimensions.width, dimensions.height, data, display]);

  useLayoutEffect(() => {
    renderTreemap();
  }, [renderTreemap]);

  return (
    <Container ref={containerRef} data-testid="treemap">
      <Typography
        variant="h6"
        style={{ marginTop: '12px', marginBottom: '12px' }}
      >
        {title}
      </Typography>
      <Svg ref={svgRef} id="treemap-svg" />
      <ToolTip info={hoveredInfo || selectedInfo} />
      <Typography
        variant="h6"
        style={{ marginTop: '4px', marginBottom: '4px', fontSize: '10' }}
      >
        {footnote_blurb}
      </Typography>
    </Container>
  );
}
