import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { longData } from 'src/testing/data/transitionData';
import TreemapWrapper, { TreemapWrapperProps } from './TreemapWrapper';
import occupations from 'src/testing/data/occupations';
import states from 'src/testing/data/states';

export default {
  title: 'JobHopper/D3Visualizations/TreemapWrapper',
  component: TreemapWrapper,
} as Meta;

export const Default: Story<TreemapWrapperProps> = args => (
  <TreemapWrapper {...args} />
);
Default.args = {
  display: 'fill',
  transitions: longData,
  selectedOccupation: occupations[0],
  selectedState: states[0],
};
