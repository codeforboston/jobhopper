import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import TransitionTable, { TransitionTableProps } from './TransitionTable';
import transitionData from '../testing/data/transitionData';
import states from '../testing/data/states';
import occupations from '../testing/data/occupations';

export default {
  title: 'JobHopper/TransitionTable',
  component: TransitionTable,
} as Meta;

const Template: Story<TransitionTableProps> = args => (
  <TransitionTable {...args} />
);

export const State = Template.bind({});
State.args = {
  selectedState: states[0],
  selectedOccupation: occupations[0],
  transitionData,
};

export const National = Template.bind({});
National.args = {
  selectedOccupation: occupations[0],
  transitionData,
};
