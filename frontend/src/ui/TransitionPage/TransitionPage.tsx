import React from 'react';
import { Section } from '../Common';
import Page from '../Page';
import { ResultsContainer } from '../Results';
import LandingBlurb from '../LandingBlurb';
import { OccupationSelectContainer, StateSelectContainer } from '../Select';
import { Body, Title } from '../Typography';
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
  return (
    <Page>
      <LandingBlurb />
      <Section>
        <Title>Enter occupation</Title>
        <Body>Type in an occupation by name or SOC code</Body>
        <OccupationSelectContainer />
      </Section>
      <Section>
        <Title>Enter State (Optional)</Title>
        <Body>If no state is entered, national wage data will be shown.</Body>
        <StateSelectContainer />
      </Section>
      <ResultsContainer />
    </Page>
  );
};

export { TransitionPage as default, ContainerContext };
