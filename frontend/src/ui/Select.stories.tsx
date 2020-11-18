// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import occupations from '../testing/data/occupations';
import states from '../testing/data/states';
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

export const Occupations: Story<OccupationSelectProps> = args => (
  <OccupationSelect {...args} />
);
Occupations.args = { occupations };

export const States: Story<StateSelectProps> = args => (
  <StateSelect {...args} />
);
States.args = { states };
