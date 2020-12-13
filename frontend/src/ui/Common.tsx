import styled from 'styled-components';
import { PrimaryButton, SecondaryButton } from './Button';

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
        margin: 20px 10px 20px 0px;
      }
    `
);
