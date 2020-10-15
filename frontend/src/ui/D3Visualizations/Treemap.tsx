import React, { useCallback, useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TreeHierarchy } from '../../domain/hierarchy';
import { Transition } from '../../domain/transition';

const fontSize = 12;
const white = '#ffffff';

export type TreeNode = TreeHierarchy | Transition;

export type TreemapProps = {
  height: number;
  width: number;
  data: TreeNode;
};

function isTransition(node: TreeNode): node is Transition {
  return (node as Transition).transitionRate !== undefined;
}

function transitionRate(node: TreeNode): number {
  return isTransition(node) ? node.transitionRate : 0;
}

export default function Treemap({ height, width, data }: TreemapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const renderTreemap = useCallback(() => {
    const container: HTMLDivElement = containerRef.current!;

    // create svg
    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // create hierarchical layout with data
    const root = d3
      .hierarchy(data)
      .sum(transitionRate)
      .sort((a, b) => a.value! - b.value!);

    // initialize treemap
    const treemapRoot = d3.treemap<TreeNode>().size([width, height]).padding(1)(
      root
    );

    // select the nodes and set x, y position
    const nodes = svg
      .selectAll('g')
      .data(treemapRoot.leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    // lighten colors
    const fader = (color: string): string =>
      d3.interpolateRgb(color, white)(0.3);

    // select color within d3.schemeSet3 (contains array of 12 colors)
    const colorScale = d3.scaleOrdinal(d3.schemeSet3.map(fader));

    // create and fill svg 'rects' based on the node data selected
    nodes
      .append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr(
        'fill',
        d => colorScale(transitionRate(d.data).toString()) || white
      );

    // add node labels
    nodes
      .append('text')
      .selectAll('tspan')
      .data(d =>
        d.data.name
          .split(/(?=[A-Z][a-z])|\s+/g)
          .concat(transitionRate(d.data).toString())
      )
      .enter()
      .append('tspan')
      .attr('font-size', `${fontSize}px`)
      .attr('x', 3)
      .attr('y', (_, i) => fontSize * i + fontSize)
      .text(d => d);
  }, [data, height, width]);

  useLayoutEffect(() => {
    renderTreemap();
  }, [renderTreemap]);

  return <div ref={containerRef}></div>;
}
