// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import occupations from '../../testing/data/occupations';
import states from '../../testing/data/states';
import transitionData from '../../testing/data/transitionData';
import Results, { ResultsProps } from './Results';

export default {
  title: 'JobHopper/Results',
  component: Results,
} as Meta;

const Template: Story<ResultsProps> = args => <Results {...args} />;

export const WaitingForSelection = Template.bind({});
WaitingForSelection.args = {
  loading: false,
  selectedState: undefined,
  selectedOccupation: undefined,
  error: undefined,
  transitions: [],
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  selectedState: undefined,
  selectedOccupation: undefined,
  transitions: [],
  error: undefined,
};

export const Error = Template.bind({});
Error.args = {
  loading: false,
  selectedState: undefined,
  selectedOccupation: undefined,
  transitions: [],
  error: 'error loading transitions',
};

export const Display = Template.bind({});
Display.args = {
  loading: false,
  selectedState: states[0],
  selectedOccupation: occupations[0],
  transitions: transitionData,
  error: undefined,
};

export const EmptyResults = Template.bind({});
EmptyResults.args = {
  loading: false,
  transitions: [],
  selectedState: undefined,
  selectedOccupation: undefined,
};
