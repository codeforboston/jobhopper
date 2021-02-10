import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Treemap, { TreemapProps } from './Treemap';
import data from '../../testing/data/transitionData';
import states from '../../testing/data/states';
import occupations from '../../testing/data/occupations';

export default {
  title: 'JobHopper/Treemap',
  component: Treemap,
} as Meta;

export const Default: Story<TreemapProps> = args => <Treemap {...args} />;
Default.args = {
  data,
  selectedState: states[0],
  selectedOccupation: occupations[0],
};
