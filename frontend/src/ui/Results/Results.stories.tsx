// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
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
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Error = Template.bind({});
Error.args = {
  loading: false,
  error: 'error loading transitions',
};

export const Display = Template.bind({});
Display.args = {
  loading: false,
  transitions: transitionData,
};
