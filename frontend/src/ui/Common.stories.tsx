import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { ShadowButton } from './Common';

export default {
  title: 'JobHopper/ShadowButton',
  component: ShadowButton,
} as Meta;

export const Default = () => <ShadowButton text="shadow" />;
