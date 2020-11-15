import { useTheme } from '@material-ui/core';
import React from 'react';
import { Occupation } from '../domain/occupation';
import { State } from '../domain/state';
import { Transition } from '../domain/transition';
import Logo from './Logo';
import { OccupationSelect, StateSelect } from './Select';
import TransitionTable from './TransitionTable';
import { Body, Header } from './Typography';
import {
  PageContainer,
  Section,
  StyledPrimary,
  StyledSecondary,
  Row,
} from './Common';

export interface TransitionPageProps {
  occupations: Occupation[];
  states: State[];
  transitions: Transition[];
}

const TransitionPage = ({
  occupations,
  states,
  transitions,
}: TransitionPageProps): JSX.Element => {
  const theme = useTheme();
  return (
    <PageContainer>
      <Logo />
      <Section>
        <Header>Enter occupation</Header>
        <Body>This is your current job, or a job you are interested in.</Body>
        <OccupationSelect occupations={occupations} />
      </Section>
      <Section>
        <Header style={{ color: theme.palette.secondary.main }}>
          Optional
        </Header>
        <Body>
          Select a state for wage data, otherwise, national data will be
          displayed.
        </Body>
        <StateSelect states={states} />
      </Section>
      <Row>
        <StyledPrimary label="See transition data" />
        <StyledSecondary label="Save data" />
      </Row>
      <TransitionTable transitionData={transitions} />
    </PageContainer>
  );
};

export default TransitionPage;
