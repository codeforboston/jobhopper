import { useTheme } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { Occupation } from '../domain/occupation';
import { State } from '../domain/state';
import { Transition } from '../domain/transition';
import { PrimaryButton, SecondaryButton } from './Button';
import Logo from './Logo';
import { OccupationSelect, StateSelect } from './Select';
import TransitionTable from './TransitionTable';
import { Body, Header } from './Typography';

const PageContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

const Section = styled.section``;

const Row = styled.div`
  display: flex;
`;

const [StyledPrimary, StyledSecondary] = [PrimaryButton, SecondaryButton].map(
  B =>
    styled(B)`
      && {
        margin: 20px 10px 20px 0px;
      }
    `
);

export interface TransitionPageProps {
  occupations: Occupation[];
  states: State[];
  transitions: Transition[];
}

const TransitionPage = ({
  occupations,
  states,
  transitions,
}: TransitionPageProps): JSX.Element => (
  <PageContainer>
    <Logo />
    <Section>
      <Header>Enter occupation</Header>
      <Body>This is your current job, or a job you are interested in.</Body>
      <OccupationSelect occupations={occupations} />
    </Section>
    <Section>
      <Header>(Optional) Enter state</Header>
      <Body>Select a state for which you'd like to view wage data.</Body>
      <StateSelect states={states} />
    </Section>
    <Row>
      <StyledPrimary label="See transition data" />
      <StyledSecondary label="Save data" />
    </Row>
    <TransitionTable transitionData={transitions} />
  </PageContainer>
);

export default TransitionPage;
