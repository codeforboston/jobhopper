import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import TransitionTable, { TransitionTableProps } from './TransitionTable';
import transitionData from './data/transitionData';

export default {
  title: 'JobHopper/TransitionTable',
  component: TransitionTable,
} as Meta;

const Template: Story<TransitionTableProps> = args => (
  <TransitionTable {...args} />
);

export const Default = Template.bind({});
Default.args = { transitionData };
