import * as d3 from 'd3';
import { getCategory, Transition } from 'src/domain/transition';
import { categories } from './category';
import { TreeNode } from './Treemap';

export function createOpacityScale(hourlyArray: number[]) {
  const maxVal = d3.max(hourlyArray);
  return d3
    .scaleLinear()
    .domain([5, maxVal || 100])
    .range([0.2, 1]);
}

export const colorScaleMajorOccupation = d3
  .scaleQuantile<string>()
  .domain(categories.map(({ code }) => code))
  .range(categories.map(({ color }) => color));

export function isTransition(node: TreeNode): node is Transition {
  return (node as Transition).transitionRate !== undefined;
}

export function name(node: TreeNode): string {
  return isTransition(node) ? node.name : '';
}

export function transitionRate(node: TreeNode): number {
  return isTransition(node) ? node.transitionRate : 0;
}

export function code(node: TreeNode): string {
  return isTransition(node) ? node.code : '0';
}

export function category(node: TreeNode): number {
  return isTransition(node) ? getCategory(node) : 0;
}

export function hourlyPay(node: TreeNode): number {
  return isTransition(node) ? node.hourlyPay : 0;
}

export function formatHourlyPay(i: TreeNode): string {
  return `$${Math.round(hourlyPay(i))}`;
}

export function formatTransitionRate(i: TreeNode): string {
  return `${Math.round(transitionRate(i) * 10000) / 100}%`;
}
