import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useMemo, useState } from 'react';
import { Transition } from 'src/domain/transition';
import ResultError from 'src/ui/Results/ResultError';
import { Column, LabeledSection, Row, StyledSecondary } from '../Common';
import Treemap from '../D3Visualizations/Treemap';
import TransitionTable from '../TransitionTable';

export interface ResultOption {
  disabled?: boolean;
  selected?: boolean;
  show?: () => void;
}

export type VisualizationType = 'matrix' | 'treemap';

export interface ResultsProps {
  loading?: boolean;
  state?: string;
  socCode?: string;
  transitions?: Transition[];
  error?: string;
  loadTransitions: (socCode: string, state?: string) => void;
}

function canLoadTransitions(code?: string): code is string {
  return !!code;
}

const Results: React.FC<ResultsProps> = ({
  transitions: immutableTransitions = [],
  state,
  socCode,
  loading = false,
  loadTransitions,
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

  const showMatrix = visualization === 'matrix' && transitions.length > 0,
    showTreemap = visualization === 'treemap' && transitions.length > 0;

  return (
    <Column>
      <LabeledSection
        title="See Transitions Data"
        subtitle="There is a choice of two ways of viewing the data."
      >
        <Row>
          <StyledSecondary
            label="See a Matrix"
            onClick={() => {
              setVisualization('matrix');
              if (canLoadTransitions(socCode)) {
                loadTransitions(socCode, state);
              }
            }}
            disabled={!canLoadTransitions(socCode) || loading}
            selected={showMatrix}
          />
          <StyledSecondary
            label="See a Treechart"
            onClick={() => {
              setVisualization('treemap');
              if (canLoadTransitions(socCode)) {
                loadTransitions(socCode, state);
              }
            }}
            disabled={!canLoadTransitions(socCode) || loading}
            selected={showTreemap}
          />
        </Row>
      </LabeledSection>
      {(() => {
        if (loading) {
          return <CircularProgress style={{ alignSelf: 'center' }} />;
        } else if (error) {
          return <ResultError error={error} />;
        } else if (showMatrix) {
          return <TransitionTable transitionData={transitions} />;
        } else if (showTreemap) {
          return <Treemap data={transitions} />;
        }
      })()}
    </Column>
  );
};

export default Results;
