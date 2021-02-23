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
import { useOccupationsState } from 'src/ducks/occupations';
import EmptyResults from 'src/ui/Results/EmptyResults';

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
  transitions: immutableTransitions,
  loading = false,
  error,
}) => {
  const [visualization, setVisualization] = useState<'matrix' | 'treemap'>(
    'matrix'
  );
  const hasResults = immutableTransitions !== undefined;

  const occupation = useOccupationsState().selectedOccupation;

  // Material table mutates its data, but immer freezes objects, so we clone
  // the transition data for compatibility.
  const transitions = useMemo<Transition[]>(
    () => (immutableTransitions ?? []).map(t => ({ ...t })),
    [immutableTransitions]
  );

  const hasTransitions = transitions.length > 0,
    showMatrix = visualization === 'matrix' && hasTransitions,
    showTreemap = visualization === 'treemap' && hasTransitions,
    disabled = !hasTransitions || loading;

  const exportPDF = async () => {
    const svgElement = document.getElementById('treemap-svg');

    if (svgElement) {
      const svgString = new XMLSerializer().serializeToString(svgElement);

      let pdf = new jsPDF('l', 'mm', [216, 279]);
      let canvas = document.createElement('canvas');
      canvas.width = 2151;
      canvas.height = 1014;
      let ctx = canvas.getContext('2d')!;
      let v = await Canvg.from(ctx, svgString);
      (await v).render();

      let image = new Image();
      let svg64 = btoa(svgString);
      let b64start = 'data:image/svg+xml;base64,';
      var image64 = b64start + svg64;
      image.src = image64;
      ctx.drawImage(image, 0, 0);
      pdf.addImage(canvas, 'PNG', 14.81, 28.2, 252, 119);

      const renderImage = async () => {
        return document.images[0];
      };

      renderImage()
        .then(response => {
          pdf.addImage(response, 'JPEG', 10, 2.47, 43.74, 20.81);
          pdf.setFontSize(9);
          const blurbString = pdf.splitTextToSize(
            'JobHopper is a Code for Boston project, and is an open source application built by volunteers.',
            73.73
          );
          pdf.text(blurbString, 265, 9.52, { align: 'right' });
          // pdf.addFont('../assets/Roboto-Regular.ttf', 'Roboto', 'normal');
          // pdf.setFont('Roboto', 'normal');
          pdf.setFontSize(12);
          pdf.text(
            `Job Transitions from ${occupation?.name} (${occupation?.code}) to:`,
            14.82,
            23
          );
          pdf.setFontSize(10);
          pdf.text(
            `This treemap shows where ${occupation?.name} move to when they switch occupations. This data was calculated by academic researchers from around 16 million resumes of U.S. workers which were generously provided and parsed by Burning Glass Technologies`,
            11.3,
            197.85,
            { maxWidth: 254.35 }
          );
        })
        .then(() => pdf.save('treemap_report'));
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
            label="See a Table"
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
        } else if (showTreemap && selectedOccupation) {
          return (
            <Treemap
              data={transitions}
              selectedOccupation={selectedOccupation}
              selectedState={selectedState}
            />
          );
        } else if (hasResults && !hasTransitions) {
          return <EmptyResults />;
        }
      })()}
    </Column>
  );
};

export default Results;
