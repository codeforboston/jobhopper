import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Select, SelectProps } from './Select';
import occupations from './data/occupations';
import { Occupation, State } from './jobs';
import states from './data/states';

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

const TypedTemplate = <T,>(): Story<SelectProps<T>> => args => (
  <Select {...args} />
);

export const Occupations = TypedTemplate<Occupation>();
Occupations.args = {
  options: occupations,
  getOptionLabel: ({ name }) => name,
  getOptionValue: ({ code }) => code,
};

export const States = TypedTemplate<State>();
States.args = {
  options: states,
  getOptionLabel: ({ name }) => name,
  getOptionValue: ({ name }) => name,
};
