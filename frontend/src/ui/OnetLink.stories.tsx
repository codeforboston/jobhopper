// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import OnetLink, { OnetLinkProps } from './OnetLink';

export default {
  title: 'JobHopper/OnetLink',
  component: OnetLink,
} as Meta;

export const OnetLinkComputerProgrammer: Story<OnetLinkProps> = args => (
  <OnetLink {...args} />
);
OnetLinkComputerProgrammer.args = { socCode: '15-1131.00' };
