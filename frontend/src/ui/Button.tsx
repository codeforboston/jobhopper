import { withTheme } from '@material-ui/core';
import {
  ButtonProps as MButtonProps,
  default as MButton,
} from '@material-ui/core/Button';
import React from 'react';
import styled from 'styled-components';
import shadow from './assets/shadow.png';
import { Section } from './Common';

export interface ButtonProps extends MButtonProps {
  label: string;
  selected?: boolean;
}

const UnstyledButton = ({ label, ...props }: ButtonProps): JSX.Element => (
  <MButton variant={'contained'} {...props}>
    {label}
  </MButton>
);

const Button = withTheme(styled(UnstyledButton)`
  && {
    font-weight: bold;
    color: white;
    text-transform: none;
    border: ${props =>
      props.color && props.selected
        ? `solid ${props.theme.palette[props.color].dark}`
        : null};
  }
`);

export const PrimaryButton = (props: ButtonProps): JSX.Element => (
  <Button color="primary" {...props} />
);

export const SecondaryButton = (props: ButtonProps): JSX.Element => (
  <Button color="secondary" {...props} />
);

export const ShadowText = styled.div`
  font-family: PT Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: #979f9f;
  text-align: center;
  flex: 1;
  margin: 10px 0 -10px 0;
`;

const Shadow = styled.img.attrs({ src: shadow, alt: '' })`
  max-width: 100px;
  flex: 1;
`;

export interface ShadowButtonProps {
  label: string;
}

export const ShadowButton = ({ label }: ShadowButtonProps): JSX.Element => {
  return (
    <Section
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100px',
      }}
    >
      <ShadowText>{label}</ShadowText>
      <Shadow />
    </Section>
  );
};

export default Button;
