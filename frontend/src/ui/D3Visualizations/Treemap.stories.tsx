import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Treemap, { TreemapProps } from './Treemap';
import transitions from '../../testing/data/transitionData';
import states from '../../testing/data/states';
import occupations from '../../testing/data/occupations';
import TreemapKey, { TreemapKeyProps } from './TreemapKey';
import { category } from './d3Utilities';

export default {
  title: 'JobHopper/D3Visualizations/Treemap',
  component: Treemap,
} as Meta;

export const Default: Story<TreemapProps> = args => <Treemap {...args} />;
Default.args = {
  display: 'fill',
  transitions: transitions,
  selectedState: states[0],
  selectedOccupation: occupations[0],
  setSelectedCategory: () => {},
};

export const Key: Story<TreemapKeyProps> = args => <TreemapKey {...args} />;
Key.args = {
  categoryCodes: testCategoryCodes(),
  selectedCategory: 11,
};

function testCategoryCodes() {
  const categoryCodes = new Set<number>();

  transitions.forEach(item => {
    categoryCodes.add(category(item));
  });

  return Array.from(categoryCodes);
}
