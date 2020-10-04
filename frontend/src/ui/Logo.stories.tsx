// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import Logo from './Logo';

export default {
  title: 'JobHopper/Logo',
  component: Logo,
} as Meta;

export const Default = () => <Logo />;
