import { useTheme } from '@material-ui/core';
import React from 'react';
import { Section } from '../Common';
import Page from '../Page';
import { ResultsContainer } from '../Results';
import { OccupationSelectContainer, StateSelectContainer } from '../Select';
import { Body, Header } from '../Typography';
import { createContainerContext } from '../utils';

const { ContainerContext, useContainerContext } = createContainerContext({
  OccupationSelectContainer,
  StateSelectContainer,
  ResultsContainer,
});

const TransitionPage: React.FC = () => {
  const {
    OccupationSelectContainer,
    StateSelectContainer,
    ResultsContainer,
  } = useContainerContext();
  const theme = useTheme();
  return (
    <Page>
      <Section>
        <Header>Enter occupation</Header>
        <Body>This is your current job, or a job you are interested in.</Body>
        <OccupationSelectContainer />
      </Section>
      <Section>
        <Header style={{ color: theme.palette.secondary.main }}>
          Optional
        </Header>
        <Body>
          Select a state for wage data, otherwise, national data will be
          displayed.
        </Body>
        <StateSelectContainer />
      </Section>
      <ResultsContainer />
    </Page>
  );
};

export { TransitionPage as default, ContainerContext };
