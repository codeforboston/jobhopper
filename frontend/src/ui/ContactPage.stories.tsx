// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import ContactPage from './ContactPage';

export default {
  title: 'JobHopper/ContactPage',
  component: ContactPage,
} as Meta;

export const Default = () => <ContactPage />;
