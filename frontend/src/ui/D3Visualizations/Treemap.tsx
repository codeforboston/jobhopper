import * as d3 from 'd3';
import { groupBy } from 'lodash';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Occupation } from '../../domain/occupation';
import { State } from '../../domain/state';
import { getCategory, Transition } from '../../domain/transition';
import { categories, getCategoryForCode } from './category';
import { colorScaleMajorOccupation, createOpacityScale } from './d3Utilities';
import { Container, Svg } from './styledDivs';
import ToolTip from './ToolTip';
import useResizeObserver from './useResizeObserver';
import './d3css.css';
import { PopUp } from './PopUp';

export type CategoryNode = {
  name: string;
  children: Transition[];
  category: number;
};
export type TreeRootNode = { children: CategoryNode[] };
export type TreeNode = TreeRootNode | CategoryNode | Transition;

export type D3SelectionBaseType = d3.Selection<
  d3.BaseType,
  unknown,
  null,
  undefined
>;

export type TreemapProps = {
  selectedOccupation: Occupation;
  selectedState?: State;
  transitions: Transition[];
  setSelectedCategory: (category: number | undefined) => void;
  display: string;
};

const groupData = (data: Transition[]): TreeRootNode => {
  let categoryGroups: any[] = [];

  const transitionsByCategory = groupBy(data, category);
  categories.forEach(({ name: categoryName, code: categoryCode }) => {
    const transitions = transitionsByCategory[categoryCode];

    if (transitions) {
      categoryGroups.push({
        name: categoryName,
        children: transitions,
        category: categoryCode,
      });
    }
  });
  return {
    children: categoryGroups,
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
  return isTransition(node) ? getCategory(node) : 0;
}

function hourlyPay(node: TreeNode): number {
  return isTransition(node) ? node.hourlyPay : 0;
}

function formatHourlyPay(i: TreeNode): string {
  return `$${Math.round(hourlyPay(i))}`;
}

function formatTransitionRate(i: TreeNode): string {
  return `${Math.round(transitionRate(i) * 10000) / 100}%`;
}

export default function Treemap({
  transitions: data,
  setSelectedCategory,
  display,
}: TreemapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);
  const svgRef = useRef<SVGSVGElement>(null);

  const [hoveredInfo, setHoveredInfo] = useState();
  const [selectedInfo, setSelectedInfo] = useState();

  const renderTreemap = useCallback(() => {
    let selectedCode: string | undefined;
    let selectedNode: D3SelectionBaseType | undefined;
    let hoveredNode: D3SelectionBaseType | undefined;

    const mouseover = (d: any, i: any) => {
      const targetCode = code(i.data);
      const outlineNode: D3SelectionBaseType = d3
        .select(d.currentTarget.parentElement)
        .select('.outline');

      if (targetCode === selectedCode) {
        selectedNode!.classed('ouline-selected', true);
      } else {
        hoveredNode = outlineNode;
        hoveredNode.classed('outline-hovered', true);
      }

      setHoveredInfo(i);
      setSelectedCategory(category(i.data));
      i.data.category = getCategoryForCode(category(i.data)).name;

      const svgBounds = {
        width: svg.node()!.clientWidth,
        height: svg.node()!.clientHeight,
      };

      popUpLabel.show(d, i, svgBounds);
    };

    const mouseout = (d: any, i: any) => {
      const targetCode = code(i.data);

      if (targetCode !== selectedCode) {
        hoveredNode?.classed('outline-hovered', false);
        hoveredNode = undefined;
      }
      if (targetCode === selectedCode) {
        hoveredNode?.classed('outline-hovered', false);
        selectedNode!.classed('outline-selected', true);
      }

      setHoveredInfo(undefined);
      setSelectedCategory(undefined);

      popUpLabel.hide();
    };

    const click = (d: any, i: any) => {
      const targetCode = code(i.data);
      const outlineNode: D3SelectionBaseType = d3
        .select(d.currentTarget.parentElement)
        .select('.outline');

      if (targetCode === selectedCode) {
        selectedNode!.classed('outline-selected', false);
        selectedCode = undefined;
        selectedNode = undefined;
        setSelectedInfo(undefined);
        setHoveredInfo(i);
        hoveredNode?.classed('outline-hovered', true);
      } else {
        selectedNode?.classed('outline-selected', false);

        selectedCode = targetCode;
        selectedNode = outlineNode;
        hoveredNode = outlineNode;

        hoveredNode.classed('outline-hovered', false);
        selectedNode.classed('outline-selected', true);
        setSelectedInfo(i);

        i.data.category = getCategoryForCode(category(i.data)).name;
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

    dataset.children.forEach(child => {
      child.children.forEach((e: Transition) => {
        hourlyArray.push(e.hourlyPay);
      });
    });

    let popUpLabel: PopUp;

    const opacity = createOpacityScale(hourlyArray);

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

    // create and fill svg 'rects' based on the node data selected
    nodes
      .append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('opacity', d =>
        display === 'salaryDisplay' ? (opacity(hourlyPay(d.data)) as number) : 1
      )
      .style('fill', d =>
        display === 'occupationDisplay'
          ? (colorScaleMajorOccupation(category(d.data)) as string)
          : '#3EB56D'
      )
      .on('click', click)
      .on('mouseover', mouseover)
      .on('mouseout', mouseout);

    // create nodes that will show hovered and selection states
    nodes
      .append('rect')
      .attr('class', 'outline')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('fill', 'transparent');

    // add node labels
    const textHolder = nodes
      .append('foreignObject')
      .attr('class', 'node-labels')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('display', d => {
        if (Math.round(transitionRate(d.data) * 10000) / 100 < 0.5) {
          return 'none';
        } else {
          return 'initial';
        }
      });

    //add title
    textHolder
      .append('xhtml:div')
      .style('padding', '6px')
      .attr('class', 'node-label-title')
      .html(
        d => `${name(d.data).replace(/ /g, '&nbsp;').replace(/\s/g, '&nbsp;')}`
      )
      .attr('data-width', d => d.x1 - d.x0);

    //add transition percent
    textHolder
      .append('xhtml:div')
      .attr('class', 'node-label-data')
      .html(d => {
        return display === 'occupationDisplay'
          ? formatTransitionRate(d.data)
          : formatHourlyPay(d.data);
      });

    // prepare pop up -- starts out hidden
    popUpLabel = new PopUp(svg);
  }, [dimensions.width, dimensions.height, data, setSelectedCategory, display]);

  useLayoutEffect(() => {
    renderTreemap();
  }, [renderTreemap]);

  return (
    <Container
      ref={containerRef}
      data-testid="treemap"
      id="treemap-container"
      className="treemap-container"
    >
      <Svg ref={svgRef} id="treemap-svg" />
      <ToolTip info={hoveredInfo || selectedInfo} />
    </Container>
  );
}
