import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import AboutPage from './AboutPage';

export default {
  title: 'JobHopper/AboutPage',
  component: AboutPage,
} as Meta;

const Template: Story = () => <AboutPage />;

export const Default = Template.bind({});
