import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import ContactPage from './Contact';

export default {
  title: 'JobHopper/Contact',
  component: ContactPage,
} as Meta;

const Template: Story = () => <ContactPage />;

export const Default = Template.bind({});
