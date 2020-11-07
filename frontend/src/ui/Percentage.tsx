import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export interface PercentageProps {
  label: string;
  precision_digits: number;
}

function transformNumber(input: any, precision_digits: number) {
  const stringInput = `${input}`.replace('%', '');
  if (isNaN(Number.parseFloat(stringInput))) {
    return NaN;
  }

  if (input.indexOf('%') > -1) {
    return `${Number.parseFloat(stringInput).toFixed(precision_digits)} %`;
  } else {
    return `${(Number.parseFloat(stringInput) / 100).toFixed(
      precision_digits
    )} %`;
  }
}

const UnstyledPercentageTypography = ({
  label,
  ...props
}: PercentageProps): JSX.Element => (
  <Typography variant={'body1'} {...props}>
    {transformNumber(label, props.precision_digits)}
  </Typography>
);

const PercentageTypography = styled(UnstyledPercentageTypography)`
  && {
    font-weight: bold;
    color: black;
    font-size: 10pt;
    text-transform: none;
  }
`;

export const PrimaryPercentageTypography = ({
  label,
  ...props
}: PercentageProps): JSX.Element => (
  <Typography color="primary" {...props}>
    {transformNumber(label, props.precision_digits)}
  </Typography>
);

export const SecondaryPercentageTypography = ({
  label,
  ...props
}: PercentageProps): JSX.Element => (
  <Typography color="secondary" {...props}>
    {transformNumber(label, props.precision_digits)}
  </Typography>
);

export default PercentageTypography;
