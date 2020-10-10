import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Treemap, { TreemapProps, mockData } from './Treemap';

export default {
  title: 'JobHopper/Treemap',
  component: Treemap,
} as Meta;

export const Default: Story<TreemapProps> = args => <Treemap {...args} />;
Default.args = { height: 400, width: 600, data: mockData };
