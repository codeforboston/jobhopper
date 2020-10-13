import React, { useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TreeHierarchy } from '../../domain/hierarchy';

export type TreemapProps = {
  height: number;
  width: number;
  data: TreeHierarchy;
};

export default function Treemap({ height, width, data }: TreemapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    renderTreemap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderTreemap() {
    const container: HTMLDivElement | null = containerRef.current;

    // create svg
    const svg: d3.Selection<
      SVGSVGElement,
      unknown,
      null,
      undefined
    > = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // create hierarchical layout with data
    const root: d3.HierarchyNode<TreeHierarchy> = d3
      .hierarchy(data)
      .sum((d: any) => d.transitionRate)
      .sort((a: any, b: any) => b.transitionRate - a.transitionRate);

    // initialize treemap
    const treemap = d3.treemap().size([width, height]).padding(1);

    treemap(root);

    // select the nodes and set x, y position
    const nodes = svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', (d: any) => `translate(${d.x0},${d.y0})`);

    // lighten colors
    const fader = (color: string): string =>
      d3.interpolateRgb(color, '#fff')(0.3);

    // select color within d3.schemeSet3 (contains array of 12 colors)
    const colorScale = d3.scaleOrdinal(d3.schemeSet3.map(fader));

    // create and fill svg 'rects' based on the node data selected
    nodes
      .append('rect')
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('height', (d: any) => d.y1 - d.y0)
      .attr('fill', (d: any) => colorScale(d.data.transitionRate));

    // add node labels
    const fontSize: number = 12;
    nodes
      .append('text')
      .selectAll('tspan')
      .data((d: any) =>
        d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(d.data.transitionRate)
      )
      .enter()
      .append('tspan')
      .attr('font-size', `${fontSize}px`)
      .attr('x', 3)
      .attr('y', (_: any, i: number) => fontSize * i + fontSize)
      .text((d: any) => d);
  }

  return <div ref={containerRef}></div>;
}
