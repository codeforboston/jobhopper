import React, { useMemo, useState } from 'react';
import { Body, Title } from '../Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Row, Section, StyledSecondary } from '../Common';
import { Transition } from 'src/domain/transition';
import Treemap from '../D3Visualizations/Treemap';
import TransitionTable from '../TransitionTable';
import ResultError from 'src/ui/Results/ResultError';

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
    <>
      <Section>
        <Title>See Transitions Data</Title>
        <Body>There is a choice of two ways of viewing the data.</Body>
      </Section>
      <Row>
        <StyledSecondary
          label="See a Matrix"
          testid="See a Matrix"
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
          testid="tree-map-button"
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
      {(() => {
        if (loading) {
          return <CircularProgress />;
        } else if (error) {
          return <ResultError error={error} />;
        } else if (showMatrix) {
          return <TransitionTable transitionData={transitions} />;
        } else if (showTreemap) {
          return <Treemap data={transitions} testid={'tree-map'}/>;
        }
      })()}
    </>
  );
};

export default Results;
