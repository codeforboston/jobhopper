import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { StyledPrimary, StyledSecondary } from './Common';
//List.stories.tsx

interface ButtonProps {
  label: string;
  testid: string;
}

export default {
  title: 'JobHopper/Common',
  components: [StyledPrimary, StyledSecondary],
} as Meta;

export const StyledPrimaryButton: Story<ButtonProps> = args => (
  <StyledPrimary {...args} />
);
StyledPrimaryButton.args = { label: 'primary button' };

export const StyledSecondaryButton: Story<ButtonProps> = args => (
  <StyledSecondary {...args} />
);
StyledSecondaryButton.args = { label: 'secondary button' };
