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

const Template: Story<TreemapWrapperProps> = args => (
  <TreemapWrapper {...args} />
);
Template.args = {
  display: 'fill',
  transitions: longData,
  selectedOccupation: occupations[0],
  selectedState: states[0],
};

export const Salary = Template.bind({});
Salary.args = {
  ...Template.args,
  display: 'salaryDisplay',
};

export const Occupation = Template.bind({});
Occupation.args = {
  ...Template.args,
  display: 'occupationDisplay',
};
