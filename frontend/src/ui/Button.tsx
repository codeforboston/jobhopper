import React from 'react';
import {
  default as MButton,
  ButtonProps as MButtonProps,
} from '@material-ui/core/Button';

export type ButtonProps = MButtonProps;
const Button = (props: ButtonProps): JSX.Element => (
  <MButton variant={'contained'} {...props} />
);

export const PrimaryButton = (props: ButtonProps): JSX.Element => (
  <Button color="primary" {...props} />
);

export const SecondaryButton = (props: ButtonProps): JSX.Element => (
  <Button color="secondary" {...props} />
);

export default Button;
