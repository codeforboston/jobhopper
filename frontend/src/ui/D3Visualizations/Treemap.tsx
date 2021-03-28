import * as d3 from 'd3';
import { groupBy } from 'lodash';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Occupation } from '../../domain/occupation';
import { State } from '../../domain/state';
import { getCategory, Transition } from '../../domain/transition';
import { categories, getCategoryForCode } from './category';
import { colorScaleMajorOccupation, createOpacityScale } from './d3Utilities';
import { Container, Svg } from './styledDivs';
import ToolTip from './ToolTip';
import useResizeObserver from './useResizeObserver';

const textFontSize = 18;
const percentFontSize = 20;

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

const outlineStyle: { selected: string; hovered: string; none: string } = {
  selected: '4px solid #2E724A',
  hovered: '3px solid #2878C8',
  none: 'none',
};

export default function Treemap({
  transitions: data,
  setSelectedCategory,
  display,
}: TreemapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);
  const svgRef = useRef<SVGSVGElement>(null);
  const leftTooltipPosition = useRef<string>('0');
  const topTooltipPosition = useRef<string>('0');

  const [hoveredInfo, setHoveredInfo] = useState();
  const [selectedInfo, setSelectedInfo] = useState();

  useEffect(() => {
    containerRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, []);

  const renderTreemap = useCallback(() => {
    let selectedCode: string | undefined;
    let selectedNode: D3SelectionBaseType | undefined;
    let hoveredNode: D3SelectionBaseType | undefined;

    const mouseover = (d: any, i: any) => {
      const targetCode = code(i.data);
      const outlineNode: D3SelectionBaseType = d3
        .select(d.currentTarget.parentElement)
        .select('.outline');

      hoveredNode = outlineNode;
      hoveredNode.style('outline', outlineStyle.hovered);
      hoveredNode.style('outline-offset', '-3px');

      if (targetCode === selectedCode) {
        selectedNode!.style('outline', outlineStyle.selected);
        selectedNode!.style('outline-offset', '-4px');
      }

      setHoveredInfo(i);
      setSelectedCategory(category(i.data));
      i.data.category = getCategoryForCode(category(i.data)).name;

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
        leftTooltipPosition.current = newLeftPosition;
      }

      if (tooltipBounds.height) {
        const newTopPosition =
          tooltipBounds.height &&
          verticalNodeMiddle + tooltipBounds.height / 2 < svgBounds.height + 1
            ? verticalNodeMiddle - tooltipBounds.height / 2 + 'px'
            : svgBounds.height - tooltipBounds.height - 18 + 'px';
        topTooltipPosition.current = newTopPosition;
      }

      toolTipContainerDiv
        .style('left', leftTooltipPosition.current)
        .style('top', topTooltipPosition.current);

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
      const targetCode = code(i.data);

      if (targetCode !== selectedCode) {
        hoveredNode?.style('outline', outlineStyle.none);
        hoveredNode?.style('outline-offset', '0');
        hoveredNode = undefined;
      }
      if (targetCode === selectedCode) {
        selectedNode!.style('outline', outlineStyle.selected);
        selectedNode!.style('outline-offset', '-4px');
      }

      setHoveredInfo(undefined);
      setSelectedCategory(undefined);

      tooltip.style('visibility', 'hidden');
    };

    const click = (d: any, i: any) => {
      const targetCode = code(i.data);
      const outlineNode: D3SelectionBaseType = d3
        .select(d.currentTarget.parentElement)
        .select('.outline');

      if (targetCode === selectedCode) {
        selectedNode!.style('outline', outlineStyle.none);
        selectedCode = undefined;
        selectedNode = undefined;
        setSelectedInfo(undefined);
        setHoveredInfo(i);
        hoveredNode?.style('outline', outlineStyle.hovered);
        hoveredNode?.style('outline-offset', '-3px');
      } else {
        selectedNode?.style('outline', outlineStyle.none);
        selectedCode = targetCode;
        selectedNode = outlineNode;
        hoveredNode = outlineNode;
        selectedNode.style('outline', outlineStyle.selected);
        selectedNode.style('outline-offset', '-4px');
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
      .attr('pointer-events', 'none')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('fill', 'transparent');

    // add node labels
    const textHolder = nodes
      .append('foreignObject')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('pointer-events', 'none')
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
      .html(
        d => `${name(d.data).replace(/ /g, '&nbsp;').replace(/\s/g, '&nbsp;')}`
      )
      .attr('data-width', d => d.x1 - d.x0)
      .style('font-size', `${textFontSize} px`)
      .style('max-height', '2.5em')
      .style('overflow', 'hidden')
      .style('text-overflow', 'ellipsis');

    //add transition percent
    textHolder
      .append('xhtml:div')
      .html(d => {
        return display === 'occupationDisplay'
          ? formatTransitionRate(d.data)
          : formatHourlyPay(d.data);
      })
      .style('font-size', `${percentFontSize} px`)
      .style('font-weight', 'bolder')
      .style('padding', '0 6px 6px 6px')
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
  }, [dimensions.width, dimensions.height, data, setSelectedCategory, display]);

  useLayoutEffect(() => {
    renderTreemap();
  }, [renderTreemap]);

  return (
    <Container ref={containerRef} data-testid="treemap" id="treemap-container">
      <Svg ref={svgRef} id="treemap-svg" />
      <ToolTip info={hoveredInfo || selectedInfo} />
    </Container>
  );
}
