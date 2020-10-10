import React, { useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';

export const mockData = {
  name: 'Waiters and Waitresses',
  soc: '35-301',
  children: [
    {
      name: 'Sales and Retail',
      children: [
        {
          category: 'Sales and Retail',
          name: 'Retail salespersons',
          value: 0.0427,
        },
        {
          category: 'Sales and Retail',
          name: 'Cashiers',
          value: 0.0312,
        },
      ],
    },
    {
      name: 'Office and Administration',
      children: [
        {
          category: 'Office and Administration',
          name: 'Customer services representatives',
          value: 0.0421,
        },
        {
          category: 'Office and Administration',
          name: 'Hotel, motel, and resort desk clerks',
          value: 0.0148,
        },
        {
          category: 'Office and Administration',
          name: 'Office clerks, general',
          value: 0.034,
        },
        {
          category: 'Office and Administration',
          name: 'Receptionists and information clerks',
          value: 0.017,
        },
      ],
    },
    {
      name: 'Management',
      children: [
        {
          category: 'Management',
          name: 'Food service managers',
          value: 0.0407,
        },
        {
          category: 'Management',
          name:
            'Secretaries and administrative assistants, except legal, medical, and executive',
          value: 0.0391,
        },
        {
          category: 'Management',
          name: 'Other Management Occupations',
          value: 0.0303,
        },
        {
          category: 'Management',
          name:
            'First-line supervisors of food preparation and serving workers',
          value: 0.0231,
        },
        {
          category: 'Management',
          name: 'First-line supervisors of retail sales workers',
          value: 0.0199,
        },
      ],
    },
    {
      name: 'Food Preparation',
      children: [
        {
          category: 'Food Preparation',
          name: 'Bartenders',
          value: 0.039,
        },
      ],
    },
    {
      name: 'Transportation',
      children: [
        {
          category: 'Transportation',
          name: 'Heavy and tractor-trailer drivers',
          value: 0.0158,
        },
      ],
    },
  ],
};

export interface TreemapProps {
  height: number;
  width: number;
  data: Root;
}

type Root = {
  name: string;
  soc: string;
  children: Node[];
};

interface Node {
  name: string;
  children: ChildNode[];
}

interface ChildNode {
  category: string;
  name: string;
  value: number;
}

export const Treemap2 = ({
  height,
  width,
  data,
}: TreemapProps): JSX.Element => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    renderGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderGraph() {
    if (!data) return;
    // create scales to help resize viewport on zoom-in/out
    const x: any = d3.scaleLinear().rangeRound([0, width]);
    const y: any = d3.scaleLinear().rangeRound([0, height]);

    // initialize svg
    const svg = d3
      .select(containerRef.current)
      .append('svg')
      .attr('viewBox', `${[0, -30, width, height]}`)
      .style('font', '12px sans-serif');

    // create a hierarchical layout with the data
    const rootNode = d3
      .hierarchy(data)
      .sum((d: any): number => d.value)
      .sort(
        (a: any, b: any): number => b.value - a.value || b.height - a.height
      );

    // format and initialize treemap layout
    const treemap = d3.treemap().tile(tile);

    // initialize root hierarchy to treemap layout
    const root = treemap(rootNode);

    // initialize the root element to build the treemap off of
    let groupRoot = svg.append('g').call(renderTreeMap, root);

    function renderTreeMap(group: any, root: any) {
      // create 'g' elements for each node in hierarchy
      const node = group
        .selectAll('g')
        .data(root.children.concat(root))
        .join('g');

      // add click events to parent node 'rects'
      node
        .filter((d: any) => (d === root ? d.parent : d.children))
        .attr('cursor', 'pointer')
        .on('click', (event: any, d: any) =>
          d === root ? zoomOut(root) : zoomIn(d)
        );

      // create color scale
      const fader = (color: string) => d3.interpolateRgb(color, '#fff')(0.3);
      const color = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

      // color each node 'rect'
      node
        .append('rect')
        .attr('fill', (d: any) =>
          d === root ? '#fff' : d.children ? color(d.data.name) : '#D5E6F7'
        )
        .attr('stroke', '#fff');

      // add node labels
      node
        .append('text')
        .attr('font-weight', (d: any) => (d === root ? 'bold' : null))
        .selectAll('tspan')
        .data((d: any) => {
          if (d === root) {
            return [name(d)];
          }
          return d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(d.value);
        })
        .join('tspan')
        .attr('x', 3)
        .attr(
          'y',
          (d: any, i: number, nodes: any) =>
            `${
              (i === nodes.length ? nodes.length - 1 : 0) * 0.3 + 1.1 + i * 0.9
            }em`
        )
        .attr('font-weight', (d: any, i: number, nodes: any) =>
          i !== nodes.length - 1 ? '500' : null
        )
        .text((d: string) => d);

      group.call(position, root);
    }

    // set the position of each node in the treemap
    function position(group: any, root: any) {
      const topBoxOffset: number = 20;
      group
        .selectAll('g')
        .attr('transform', (d: any) =>
          d === root
            ? `translate(0,-${topBoxOffset})`
            : `translate(${x(d.x0)},${y(d.y0)})`
        )
        .select('rect')
        .attr('width', (d: any) => (d === root ? width : x(d.x1) - x(d.x0)))
        .attr('height', (d: any) =>
          d === root ? topBoxOffset : y(d.y1) - y(d.y0)
        );
    }

    function zoomIn(d: any) {
      const group0: any = groupRoot.attr('pointer-events', 'none');
      const group1: any = (groupRoot = svg.append('g').call(renderTreeMap, d));

      // reset the size of the svg view to the current node category selected
      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);

      svg
        .transition()
        .duration(750)
        .call((t: any) =>
          group0.transition(t).remove().call(position, d.parent)
        )
        .call((t: any) =>
          group1
            .transition(t)
            .attrTween('opacity', () => d3.interpolate(0, 1))
            .call(position, d)
        );
    }

    // When zooming out, draw the old nodes on top, and fade them out.
    function zoomOut(d: any) {
      const group0: any = groupRoot.attr('pointer-events', 'none');
      const group1: any = (groupRoot = svg
        .insert('g', '*')
        .call(renderTreeMap, d.parent));

      x.domain([d.parent.x0, d.parent.x1]);
      y.domain([d.parent.y0, d.parent.y1]);

      svg
        .transition()
        .duration(750)
        .call((t: any) =>
          group0
            .transition(t)
            .remove()
            .attrTween('opacity', () => d3.interpolate(1, 0))
            .call(position, d)
        )
        .call((t: any) => group1.transition(t).call(position, d.parent));
    }

    // This custom tiling function adapts the built-in d3 binary tiling function for the appropriate aspect ratio when the treemap is zoomed-in.
    function tile(node: any, x0: number, y0: number, x1: number, y1: number) {
      d3.treemapBinary(node, 0, 0, width, height);
      for (const child of node.children) {
        child.x0 = x0 + (child.x0 / width) * (x1 - x0);
        child.x1 = x0 + (child.x1 / width) * (x1 - x0);
        child.y0 = y0 + (child.y0 / height) * (y1 - y0);
        child.y1 = y0 + (child.y1 / height) * (y1 - y0);
      }
    }

    // return the top rect's name based on the node category selected
    function name(d: any) {
      return d
        .ancestors()
        .reverse()
        .map((d: any) => d.data.name)
        .join('/');
    }
  }

  return (
    <div>
      <div ref={containerRef}></div>
    </div>
  );
};

export default Treemap2;
