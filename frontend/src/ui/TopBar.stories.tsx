import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import TopBar from './TopBar';

export default {
  title: 'Jobhopper/TopBar',
  component: TopBar,
} as Meta;

const Template: Story = () => <TopBar />;

export const Default = Template.bind({});
