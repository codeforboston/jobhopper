import d3 from 'd3';
import { Transition } from '../../domain/transition';
import { TreeNode } from './Treemap';
import './d3css.css';
export type d3SVGSelection = d3.Selection<
  SVGSVGElement,
  unknown,
  null,
  undefined
>;

export type d3SelectionForeignElement = d3.Selection<
  SVGForeignObjectElement,
  unknown,
  null,
  undefined
>;

function isTransition(node: TreeNode): node is Transition {
  return (node as Transition).transitionRate !== undefined;
}

function name(node: TreeNode): string {
  return isTransition(node) ? node.name : '';
}

function transitionRate(node: TreeNode): number {
  return isTransition(node) ? node.transitionRate : 0;
}

export class PopUp {
  toolTip: any;
  leftTooltipPosition: string = '0';
  topTooltipPosition: string = '0';
  root: d3.Selection<SVGSVGElement | null, unknown, null, undefined>;

  constructor(
    treemapSVGRoot: d3.Selection<SVGSVGElement | null, unknown, null, undefined>
  ) {
    this.root = treemapSVGRoot;

    this.toolTip = this.root
      .append('g')
      .append('foreignObject')
      .attr('id', 'toolTipObj')
      .attr('class', 'tool-tip-obj')
      .attr('width', treemapSVGRoot.node()!.clientWidth)
      .attr('height', treemapSVGRoot.node()!.clientHeight);

    const toolTipContainerDiv = this.toolTip
      .append('xhtml:div')
      .attr('id', 'tooltipcontainer')
      .attr('class', 'tool-tip-container');

    toolTipContainerDiv
      .append('xhtml:div')
      .attr('class', 'tool-tip-div')
      .html('tooltext');
  }

  show(d: any, i: any, svgBounds: { width: number; height: number }) {
    const toolTipDiv = this.toolTip.select('.tool-tip-div');
    const toolTipContainerDiv = this.toolTip.select('.tool-tip-container');
    toolTipDiv.html(
      `${name(i.data)} ${Math.round(transitionRate(i.data) * 10000) / 100}%`
    );

    const horizontalNodeMiddle = i.x0 + (i.x1 - i.x0) / 2;
    const verticalNodeStart = i.y0;
    const verticalNodeEnd = i.y1;

    const toolTipElement = toolTipDiv.node() as HTMLDivElement;
    const tooltipBounds = {
      width: toolTipElement.clientWidth,
      height: toolTipElement.clientHeight,
    };

    if (tooltipBounds.width) {
      const newLeftPosition =
        horizontalNodeMiddle + tooltipBounds.width / 2 < svgBounds.width + 1
          ? horizontalNodeMiddle - tooltipBounds.width / 2 < 0
            ? 20 + 'px'
            : horizontalNodeMiddle - tooltipBounds.width / 2 + 'px'
          : svgBounds.width - tooltipBounds.width - 20 + 'px';
      this.leftTooltipPosition = newLeftPosition;
    }

    if (tooltipBounds.height) {
      const buffer = 3;
      const newTopPosition =
        tooltipBounds.height &&
        verticalNodeStart - tooltipBounds.height - buffer < 0
          ? verticalNodeEnd + buffer + 'px'
          : verticalNodeStart - tooltipBounds.height - buffer + 'px';
      this.topTooltipPosition = newTopPosition;
    }

    toolTipContainerDiv
      .style('left', this.leftTooltipPosition)
      .style('top', this.topTooltipPosition);

    this.toolTip
      .transition()
      .style('visibility', 'visible')
      .transition()
      .delay(250)
      .duration(500)
      .style('opacity', '1');
    // .ease(d3.easeCubicInOut);
  }

  hide() {
    this.toolTip.style('visibility', 'hidden');
  }
}
