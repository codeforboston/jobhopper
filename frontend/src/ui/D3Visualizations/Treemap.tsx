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
import { Title } from './TreemapSubComponents';
import useResizeObserver from './useResizeObserver';

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
  title: string;
  selectedOccupation?: Occupation;
  selectedState?: State;
  data: Transition[];
  setSelectedCategory: any;
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
  title,
  data,
  setSelectedCategory,
}: TreemapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);
  const svgRef = useRef<SVGSVGElement>(null);

  const [hoveredInfo, setHoveredInfo] = useState();
  const [selectedInfo, setSelectedInfo] = useState();
  const [leftTooltipPosition, setLeftTooltipPosition] = useState<string>('0');
  const [topTooltipPosition, setTopTooltipPosition] = useState<string>('0');

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
        targetNode.style('stroke', '#2878C8');
        setSelectedCategory(category(i.data).toString());
      }

      if (hoveredCode !== targetCode) {
        i.data.category = majorLookup.get(parseInt(code(i.data).slice(0, 2)));
        setHoveredInfo(i);
        hoveredCode = targetCode;
      }

      toolTipDiv.html(
        `${name(i.data)} ${Math.round(transitionRate(i.data) * 10000) / 100}%`
      );

      const horizontalNodeMiddle = i.x0 + (i.x1 - i.x0) / 2;
      const verticalNodeMiddle = i.y0 + (i.y1 - i.y0) / 2;

      const toolTipElement = toolTipDiv.node() as HTMLDivElement;
      const tooltipBounds = {
        width: toolTipElement.clientWidth,
        height: toolTipElement.clientHeight,
      };

      const svgBounds = {
        width: svg.node()!.clientWidth,
        height: svg.node()!.clientHeight,
      };

      if (tooltipBounds.width) {
        const newLeftPosition =
          horizontalNodeMiddle + tooltipBounds.width / 2 < svgBounds.width + 1
            ? horizontalNodeMiddle - tooltipBounds.width / 2 < 0
              ? 20 + 'px'
              : horizontalNodeMiddle - tooltipBounds.width / 2 + 'px'
            : svgBounds.width - tooltipBounds.width - 20 + 'px';
        setLeftTooltipPosition(newLeftPosition);
        console.log(tooltipBounds, newLeftPosition);
      }

      if (tooltipBounds.height) {
        const newTopPosition =
          tooltipBounds.height &&
          verticalNodeMiddle + tooltipBounds.height / 2 < svgBounds.height + 1
            ? verticalNodeMiddle - tooltipBounds.height / 2 + 'px'
            : svgBounds.height - tooltipBounds.height - 18 + 'px';
        setTopTooltipPosition(newTopPosition);
      }

      toolTipContainerDiv
        .style('left', leftTooltipPosition)
        .style('top', topTooltipPosition);

      tooltip
        .transition()
        .style('visibility', 'visible')
        .transition()
        .delay(250)
        .duration(500)
        .style('opacity', '1')
        .ease(d3.easeCubicInOut);
    };

    const mouseout = (d: any, i: any) => {
      const targetNode = d3.select(d.currentTarget);
      const targetCode = code(i.data);
      if (selectedCode !== targetCode) {
        targetNode.style('stroke', white);
      }
      setHoveredInfo(undefined);
      hoveredCode = undefined;
      setSelectedCategory(undefined);

      tooltip.style('visibility', 'hidden');
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
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`);

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
      .style('stroke-width', '2px')
      .style('stroke', white)
      .on('click', click)
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .style('stroke-width', d => 0);

    // add node labels
    nodes
      .append('foreignObject')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('pointer-events', 'none')
      .append('xhtml:div')
      .style('padding', '6px')
      .html(d => `${name(d.data)} `)
      .attr('data-width', d => d.x1 - d.x0)
      .style('font-size', `${textFontSize} px`)
      .style('overflow', 'hidden')
      .style('height', d => d.y1 - d.y0 - percentFontSize + 'px')

      .append('xhtml:div')
      .html(d => `${Math.round(transitionRate(d.data) * 10000) / 100}% `)
      .style('font-size', `${percentFontSize} px`)
      .style('font-weight', 'bolder')
      .style('position', 'sticky')
      .style('bottom', '6px')
      .style('color', 'black');

    const tooltipGroup = svg.append('g');

    const tooltip = tooltipGroup
      .append('foreignObject')
      .attr('id', 'toolTipObj')
      .style('visibility', 'hidden')
      .style('z-index', 10)
      .style('padding', '6px')
      .attr('pointer-events', 'none')
      .style('position', 'relative')
      .attr('width', svg.node()!.clientWidth)
      .attr('height', svg.node()!.clientHeight);

    const toolTipContainerDiv = tooltip
      .append('xhtml:div')
      .attr('id', 'tooltipcontainer')
      .style('height', '5%')
      .style('min-width', '20%')
      .style('max-width', '35%')
      .style('position', 'absolute');

    const toolTipDiv = toolTipContainerDiv
      .append('xhtml:div')
      .style('background-color', 'white')
      .style('border-radius', '5px')
      .style('text-align', 'center')
      .style('padding', '3px 10px')
      .html('tooltext');
  }, [
    dimensions.width,
    dimensions.height,
    data,
    leftTooltipPosition,
    topTooltipPosition,
    setSelectedCategory,
  ]);

  useLayoutEffect(() => {
    renderTreemap();
  }, [renderTreemap]);

  return (
    <Container ref={containerRef} data-testid="treemap">
      <Title>{title}</Title>
      <Svg ref={svgRef} />
      <ToolTip info={hoveredInfo || selectedInfo} />
    </Container>
  );
}
