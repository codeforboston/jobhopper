import React from 'react';
import { LabeledSection } from '../Common';
import Page from '../Page';
import { ResultsContainer } from '../Results';
import { LandingBlurbContainer } from '../LandingBlurb';
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
      <LandingBlurbContainer />
      <LabeledSection
        title="Enter occupation"
        subtitle="Type in an occupation by name or SOC code."
      >
        <OccupationSelectContainer />
      </LabeledSection>
      <LabeledSection
        title="Enter State (Optional)"
        subtitle="If no state is entered, national wage data will be shown."
      >
        <StateSelectContainer />
      </LabeledSection>
      <ResultsContainer />
    </Page>
  );
};

export { TransitionPage as default, ContainerContext };
