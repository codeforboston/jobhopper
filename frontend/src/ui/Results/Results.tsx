import CircularProgress from '@material-ui/core/CircularProgress';
import React, { createElement, useMemo, useState } from 'react';
import { Transition } from 'src/domain/transition';
import ResultError from 'src/ui/Results/ResultError';
import { Column, LabeledSection, Row, StyledSecondary } from '../Common';
import Treemap from '../D3Visualizations/Treemap';
import TransitionTable from '../TransitionTable';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import Canvg, { presets } from 'canvg';
import { jsPDF } from 'jspdf';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface ResultsProps {
  selectedState?: State;
  selectedOccupation?: Occupation;
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

  const exportPDF = async () => {
    const svgElement = document.getElementById('treemap-svg');
    const svgOuter = svgElement?.outerHTML;
    console.log(svgOuter);

    if (svgOuter && svgElement) {
      const svgString = new XMLSerializer().serializeToString(svgElement);

      let pdf = new jsPDF('l');
      let canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 768;
      let ctx = canvas.getContext('2d')!;
      let v = await Canvg.from(ctx, svgString);
      // v.resize(1131, 663, 'xMidYMid meet');
      (await v).render();

      let image = new Image();
      let svg64 = btoa(svgString);
      let b64start = 'data:image/svg+xml;base64,';
      var image64 = b64start + svg64;
      image.src = image64;
      ctx.drawImage(image, 0, 0);

      pdf.text('JobHopper:', 10, 10);
      pdf.text(
        'This visualization shows where {} move to when they switch occupations.',
        10,
        20
      );
      pdf.addImage(canvas, 'PNG', 0, 30, 300, 150);
      pdf.text(
        'The visualization was created by Code for Boston’s JobHopper team, using data from 16 million U.S. workers’ resumes compiled by Burning Glass Technologies.',
        5,
        200
      );
      pdf.save('treemap');
    }
  };

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
          <StyledSecondary
            label="Export Chart"
            testid="treechartPdf"
            onClick={exportPDF}
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
            <TransitionTable
              selectedOccupation={selectedOccupation}
              selectedState={selectedState}
              transitionData={transitions}
            />
          );
        } else if (showTreemap) {
          return <Treemap data={transitions} />;
        }
      })()}
    </Column>
  );
};

export default Results;
