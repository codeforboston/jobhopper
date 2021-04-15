import { Meta, Story } from '@storybook/react';
import React from 'react';
import occupations from '../../testing/data/occupations';
import states from '../../testing/data/states';
import {
  OccupationSelect,
  OccupationSelectProps,
  Select,
  StateSelect,
  StateSelectProps,
} from './Select';

export default {
  title: 'JobHopper/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const OccupationsTemplate: Story<OccupationSelectProps> = args => (
  <OccupationSelect {...args} />
);
OccupationsTemplate.args = {
  fetchOptions: input => {
    console.log('fetchOptions', input);
    return Promise.resolve(occupations);
  },
  onSelectOccupation: o => console.log('occupation', o),
};

export const NormalOccupations = OccupationsTemplate.bind({});
NormalOccupations.args = { ...OccupationsTemplate.args };

export const LoadingOccupations = OccupationsTemplate.bind({});
LoadingOccupations.args = { ...OccupationsTemplate.args, loading: true };

export const ErrorOccupations = OccupationsTemplate.bind({});
ErrorOccupations.args = {
  ...OccupationsTemplate.args,
  error: 'Error loading occupations',
};

const StatesTemplate: Story<StateSelectProps> = args => (
  <StateSelect {...args} />
);
StatesTemplate.args = { states, onSelectState: s => console.log('state', s) };

export const NormalStates = StatesTemplate.bind({});
NormalStates.args = { ...StatesTemplate.args };

export const LoadingStates = StatesTemplate.bind({});
LoadingStates.args = { ...StatesTemplate.args, loading: true };

export const ErrorStates = StatesTemplate.bind({});
ErrorStates.args = { ...StatesTemplate.args, error: 'Error loading states' };
