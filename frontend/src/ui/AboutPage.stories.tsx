// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import AboutPage from './AboutPage';

export default {
  title: 'JobHopper/AboutPage',
  component: AboutPage,
} as Meta;

export const Default = () => <AboutPage />;
