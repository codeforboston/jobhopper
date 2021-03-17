// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import OnetLink, { OnetLinkProps } from './OnetLink';

export default {
  title: 'JobHopper/OnetLink',
  component: OnetLink,
} as Meta;

const Template: Story<OnetLinkProps> = args => <OnetLink {...args} />;

export const OnetLinkDecimalCode = Template.bind({});
OnetLinkDecimalCode.args = {
  socCode: '15-1131.00',
  children: '15-1131.00',
  occupation: 'Computer Programmer',
};

export const OnetLinkIntegerCode = Template.bind({});
OnetLinkIntegerCode.args = {
  socCode: '15-1131',
  children: '16-161616',
  occupation: 'Computer Programmer',
};
