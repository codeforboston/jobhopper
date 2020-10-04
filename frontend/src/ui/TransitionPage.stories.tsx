import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import TransitionPage, { TransitionPageProps } from './TransitionPage';
import * as Select from './Select.stories';
import * as TransitionTable from './TransitionTable.stories';

export default {
  title: 'JobHopper/TransitionPage',
  component: TransitionPage,
} as Meta;

const Template: Story<TransitionPageProps> = args => (
  <TransitionPage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  occupations: Select.Occupations.args?.occupations,
  states: Select.States.args?.states,
  transitions: TransitionTable.Default.args?.transitionData,
};
