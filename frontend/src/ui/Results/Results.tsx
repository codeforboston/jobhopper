import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useMemo, useState } from 'react';
import { Transition } from 'src/domain/transition';
import ResultError from 'src/ui/Results/ResultError';
import { Column, LabeledSection, Row, StyledSecondary } from '../Common';
import Treemap from '../D3Visualizations/Treemap';
import TransitionTable from '../TransitionTable';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { Body } from '../Typography';

export interface ResultsProps {
  selectedState?: State;
  selectedOccupation: Occupation;
  loading?: boolean;
  transitions?: Transition[];
  error?: string;
}

const Results: React.FC<ResultsProps> = ({
  selectedOccupation,
  selectedState,
  transitions: immutableTransitions = [],
  loading = false,
  error,
}) => {
  const [visualization, setVisualization] = useState<'matrix' | 'treemap'>(
    'matrix'
  );

  // Material table mutates its data, but immer freezes objects, so we clone
  // the transition data for compatibility.
  const transitions = useMemo<Transition[]>(
    () => immutableTransitions.map(t => ({ ...t })),
    [immutableTransitions]
  );

  const hasTransitions = transitions.length > 0,
    showMatrix = visualization === 'matrix' && hasTransitions,
    showTreemap = visualization === 'treemap' && hasTransitions,
    disabled = !hasTransitions || loading;

  return (
    <Column>
      <LabeledSection
        title="See Transitions Data"
        subtitle="There is a choice of two ways of viewing the data."
      >
        <Row>
          <StyledSecondary
            label="See a Matrix"
            testid="matrix-button"
            onClick={() => {
              setVisualization('matrix');
            }}
            disabled={disabled}
            selected={showMatrix}
          />
          <StyledSecondary
            label="See a Treechart"
            testid="treemap-button"
            onClick={() => {
              setVisualization('treemap');
            }}
            disabled={disabled}
            selected={showTreemap}
          />
        </Row>
      </LabeledSection>
      {(() => {
        if (loading) {
          return <CircularProgress style={{ alignSelf: 'center' }} />;
        } else if (error) {
          return <ResultError error={error} />;
        } else if (showMatrix && selectedOccupation) {
          return (
            <React.Fragment>
              <TransitionTable
                selectedOccupation={selectedOccupation}
                selectedState={selectedState}
                transitionData={transitions}
              />
              <Body>
                This table/matrix shows the occupations that{' '}
                {selectedOccupation.name.toLowerCase()} move to when they change
                occupation. The transition share is the percentage proportion of{' '}
                {selectedOccupation.name.toLowerCase()} who move into a job in
                each other occupation when they switch occupation. We only show
                occupations with more than with transition shares greater than
                0.2% of {selectedOccupation.name.toLowerCase()} transitioning
                into them.
              </Body>
            </React.Fragment>
          );
        } else if (showTreemap) {
          return (
            <Treemap
              data={transitions}
              selectedOccupation={selectedOccupation}
              selectedState={selectedState}
            />
          );
        }
      })()}
    </Column>
  );
};

export default Results;
