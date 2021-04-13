import * as d3 from 'd3';
import { categories } from './category';

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
