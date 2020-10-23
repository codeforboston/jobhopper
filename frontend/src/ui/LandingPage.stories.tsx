import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import LandingPage, { LandingPageProps } from './LandingPage';

export default {
  title: 'JobHopper/LandingPage',
  component: LandingPage,
} as Meta;

const Template: Story<LandingPageProps> = () => <LandingPage />;

export const Default = Template.bind({});
