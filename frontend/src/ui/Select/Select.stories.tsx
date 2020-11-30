// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
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
  occupations,
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

export const States: Story<StateSelectProps> = args => (
  <StateSelect {...args} />
);
States.args = { states, onSelectState: s => console.log('state', s) };
