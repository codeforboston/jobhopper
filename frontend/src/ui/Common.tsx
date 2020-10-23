import React from 'react';
import styled from 'styled-components';
import shadow from './assets/shadow.png';
import { PrimaryButton, SecondaryButton } from './Button';

export const PageContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

export const Section = styled.section``;

export const Row = styled.div`
  display: flex;
`;

export const [StyledPrimary, StyledSecondary] = [
  PrimaryButton,
  SecondaryButton,
].map(
  B =>
    styled(B)`
      && {
        margin: 20px 10px 20px 0px;
      }
    `
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
  text: string;
}

export const ShadowButton = ({ text }: ShadowButtonProps): JSX.Element => {
  return (
    <Section
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <ShadowText>{text}</ShadowText>
      <Shadow />
    </Section>
  );
};
