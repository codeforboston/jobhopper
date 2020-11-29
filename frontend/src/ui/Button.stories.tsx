import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, {
  ButtonProps,
  PrimaryButton,
  SecondaryButton,
  ShadowButton,
} from './Button';
import styled from 'styled-components';

export default {
  title: 'JobHopper/Button',
  component: Button,
} as Meta;

const Column = styled.div`
  && > * {
    display: block;
    margin-top: 20px;
  }
`;

export const Default: Story<ButtonProps> = args => <Button {...args} />;
Default.args = { label: 'Default' };

export const Primary: Story<ButtonProps> = args => (
  <Column>
    <PrimaryButton {...args} />
    <PrimaryButton {...args} selected label={`${args.label} Selected`} />
  </Column>
);
Primary.args = { label: 'Primary' };

export const Secondary: Story<ButtonProps> = args => (
  <Column>
    <SecondaryButton {...args} />
    <SecondaryButton {...args} selected label={`${args.label} Selected`} />
  </Column>
);
Secondary.args = { label: 'Secondary' };

export const ShadowNavButton: Story<ButtonProps> = args => (
  <ShadowButton {...args} />
);
ShadowNavButton.args = { label: 'button' };
