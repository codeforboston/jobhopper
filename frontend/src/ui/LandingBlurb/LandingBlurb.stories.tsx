import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { LandingBlurbContainer } from './LandingBlurbContainer';

export default {
  title: 'JobHopper/LandingBlurb',
  component: LandingBlurbContainer,
} as Meta;

const Template: Story = () => <LandingBlurbContainer />;

export const Default = Template.bind({});
