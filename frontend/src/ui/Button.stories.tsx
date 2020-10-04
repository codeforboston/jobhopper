import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { ButtonProps, PrimaryButton, SecondaryButton } from './Button';

export default {
  title: 'JobHopper/Button',
  component: Button,
} as Meta;

export const Default: Story<ButtonProps> = args => <Button {...args} />;
Default.args = { label: 'Default' };

export const Primary: Story<ButtonProps> = args => <PrimaryButton {...args} />;
Primary.args = { label: 'Primary' };

export const Secondary: Story<ButtonProps> = args => (
  <SecondaryButton {...args} />
);
Secondary.args = { label: 'Secondary' };
