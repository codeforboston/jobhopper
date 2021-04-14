import React from 'react';
import { LabeledSection } from '../Common';
import Page from '../Page';
import { ResultsContainer } from '../Results';
import LandingBlurb from '../LandingBlurb';
import { OccupationSelectContainer, StateSelectContainer } from '../Select';
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
      <LabeledSection
        title="Enter occupation"
        subtitle="Type in an occupation by name or SOC code to see nationwide occupational transitions."
      >
        <OccupationSelectContainer />
      </LabeledSection>
      <LabeledSection
        title="Enter State (Optional)"
        subtitle="Type in a state to see state-level average wage data. If no state is entered, national wage data will be shown."
      >
        <StateSelectContainer />
      </LabeledSection>
      <ResultsContainer />
    </Page>
  );
};

export { TransitionPage as default, ContainerContext };
