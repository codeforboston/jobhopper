import React from 'react';
import { ResultsContainer } from '../Results';
import { OccupationSelectContainer, StateSelectContainer } from '../Select';
import TransitionPage, { ContainerContext } from './TransitionPage';

export const TransitionPageContainer = () => {
  return (
    <ContainerContext.Provider
      value={{
        OccupationSelectContainer,
        StateSelectContainer,
        ResultsContainer,
      }}
    >
      <TransitionPage />
    </ContainerContext.Provider>
  );
};
