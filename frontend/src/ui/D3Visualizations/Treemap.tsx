import React, { useCallback, useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { Transition } from '../../domain/transition';
import useResizeObserver from './useResizeObserver';

const Container = styled.div`
  width: 70vw;
  height: 50vh;
`;

const Svg = styled.svg``;

const fontSize = 12;
const white = '#ffffff';
const colorRange = ['#bce4d9', '#6ab6c4', '#357ea1'];

export type TreeNode = { children: Transition[] } | Transition;

export type TreemapProps = {
  data: Transition[];
};

function createHierarchy(data: Transition[]): TreeNode {
  return {
    children: data,
  };
}

function isTransition(node: TreeNode): node is Transition {
  return (node as Transition).transitionRate !== undefined;
}

function name(node: TreeNode): string {
  return isTransition(node) ? node.name : '';
}

function transitionRate(node: TreeNode): number {
  return isTransition(node) ? node.transitionRate : 0;
}

export default function Treemap({ data }: TreemapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);
  const svgRef = useRef<SVGSVGElement>(null);

  const renderTreemap = useCallback(() => {
    // clear previous svg children renderings
    d3.select(svgRef.current).selectAll('g').remove();

    // create svg
    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    // create hierarchical layout with data
    const root = d3
      .hierarchy(createHierarchy(data))
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

    // select color within d3.schemeSet3 (contains array of 12 colors)
    const colorScale = d3
      .scaleQuantile<string>()
      .domain(data.map(d => d.transitionRate))
      .range(colorRange);

    // create and fill svg 'rects' based on the node data selected
    nodes
      .append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => colorScale(transitionRate(d.data)) || white);

    // add node labels
    nodes
      .append('text')
      .text(d => `${name(d.data)} ${transitionRate(d.data)}`)
      .attr('data-width', d => d.x1 - d.x0)
      .attr('font-size', `${fontSize}px`)
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
          const tspanLength = tspan.node()?.getComputedTextLength()!;
          if (tspanLength > width) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = addTspan(word);
          }
        }
        // add transition rate as last tspan
        addTspan(words.pop()!);

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
  }, [data, dimensions]);

  useLayoutEffect(() => {
    renderTreemap();
  }, [renderTreemap]);

  return (
    <Container ref={containerRef}>
      <Svg ref={svgRef} />
    </Container>
  );
}
