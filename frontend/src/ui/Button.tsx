import React from 'react';
import {
  default as MButton,
  ButtonProps as MButtonProps,
} from '@material-ui/core/Button';
import styled from 'styled-components';

export interface ButtonProps extends MButtonProps {
  label: string;
}

const UnstyledButton = ({ label, ...props }: ButtonProps): JSX.Element => (
  <MButton variant={'contained'} {...props}>
    {label}
  </MButton>
);

const Button = styled(UnstyledButton)`
  && {
    font-weight: bold;
    color: white;
    text-transform: none;
  }
`;

export const PrimaryButton = (props: ButtonProps): JSX.Element => (
  <Button color="primary" {...props} />
);

export const SecondaryButton = (props: ButtonProps): JSX.Element => (
  <Button color="secondary" {...props} />
);

export default Button;
