import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import LandingBlurb from './LandingBlurb';

export default {
  title: 'JobHopper/LandingBlurb',
  component: LandingBlurb,
} as Meta;

const Template: Story = () => <LandingBlurb />;

export const Default = Template.bind({});
