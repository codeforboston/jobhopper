import React from 'react';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton } from './Button';
import { Body, Title } from './Typography';

export const Section = styled.section``;

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const [StyledPrimary, StyledSecondary] = [
  PrimaryButton,
  SecondaryButton,
].map(
  B =>
    styled(B)`
      && {
        margin-right: 10px;
      }
    `
);

export interface LabeledSectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const LabeledSection: React.FC<LabeledSectionProps> = ({
  title,
  subtitle,
  children,
}) => (
  <Section style={{ marginBottom: '3em' }}>
    <Title style={{ marginBlock: '0' }}>{title}</Title>
    <Body style={{ marginBlockStart: '0' }}>{subtitle}</Body>
    {children}
  </Section>
);
