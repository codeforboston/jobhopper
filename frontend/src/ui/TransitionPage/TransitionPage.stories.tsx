import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import TransitionPage, { ContainerContext } from './TransitionPage';
import * as Select from '../Select/Select.stories';
import * as Results from '../Results/Results.stories';
import { bindArgs } from '../story-utils';

export default {
  title: 'JobHopper/TransitionPage',
  component: TransitionPage,
} as Meta;

const Template: Story<{
  resultsArgs: typeof Results.Display.args;
  occupationSelectArgs: typeof Select.NormalOccupations.args;
  stateSelectArgs: typeof Select.States.args;
  resultsStory: typeof Results.Display;
}> = ({ resultsArgs, occupationSelectArgs, stateSelectArgs, resultsStory }) => (
  <ContainerContext.Provider
    value={{
      OccupationSelectContainer: bindArgs(
        Select.NormalOccupations,
        occupationSelectArgs
      ),
      StateSelectContainer: bindArgs(Select.States, stateSelectArgs),
      ResultsContainer: bindArgs(resultsStory, resultsArgs),
    }}
  >
    <TransitionPage />
  </ContainerContext.Provider>
);

export const Default = Template.bind({});
Default.args = {
  resultsStory: Results.Display,
  resultsArgs: Results.Display.args,
  occupationSelectArgs: Select.NormalOccupations.args,
  stateSelectArgs: Select.States.args,
};
