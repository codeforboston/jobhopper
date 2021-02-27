import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Treemap, { TreemapProps, category } from './Treemap';
import transitions from '../../testing/data/transitionData';
import states from '../../testing/data/states';
import occupations from '../../testing/data/occupations';
import TreemapKey, { TreemapKeyProps } from './TreemapKey';

export default {
  title: 'JobHopper/D3Visualizations/Treemap',
  component: Treemap,
} as Meta;

export const Default: Story<TreemapProps> = args => <Treemap {...args} />;
Default.args = {
  transitions: transitions,
  selectedState: states[0],
  selectedOccupation: occupations[0],
};

const occCategoryList = new Set<number>();

transitions.forEach(item => {
  occCategoryList.add(category(item));
});

export const Key: Story<TreemapKeyProps> = args => <TreemapKey {...args} />;
Key.args = {
  categoryCodes: occCategoryList,
};
