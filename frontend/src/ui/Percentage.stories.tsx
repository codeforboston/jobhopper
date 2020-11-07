// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import PercentageTypography, {
  PercentageProps,
  PrimaryPercentageTypography,
  SecondaryPercentageTypography,
} from './Percentage';

export default {
  title: 'JobHopper/PercentageTypography',
  component: PercentageTypography,
  decorators: [
    Story => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Percent_100: Story<PercentageProps> = args => (
  <PercentageTypography {...args} />
);
Percent_100.args = { precision_digits: 5, label: '100%' };

export const PrimaryWithPercent_43point2: Story<PercentageProps> = args => (
  <PrimaryPercentageTypography {...args} />
);
PrimaryWithPercent_43point2.args = { precision_digits: 2, label: '%43.2' };

export const SecondaryWithoutPercent_01point2: Story<PercentageProps> = args => (
  <SecondaryPercentageTypography {...args} />
);
SecondaryWithoutPercent_01point2.args = { precision_digits: 2, label: '01.2' };

export const PercentBadInput: Story<PercentageProps> = args => (
  <PercentageTypography {...args} />
);
PercentBadInput.args = { precision_digits: 2, label: 'testing' };
