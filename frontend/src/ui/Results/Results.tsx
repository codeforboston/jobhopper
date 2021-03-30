import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Canvg from 'canvg';
import jsPDF from 'jspdf';
import React, { useMemo, useState } from 'react';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { Transition } from 'src/domain/transition';
import ResultError from 'src/ui/Results/ResultError';
import { Column, LabeledSection, Row, StyledSecondary } from '../Common';
import TreemapWrapper from '../D3Visualizations/TreemapWrapper';
import GreenRadio from '../RadioButton';
import TransitionTable from '../TransitionTable';
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
          pdf.setFontSize(12);
          pdf.text(
            `Job Transitions from ${selectedOccupation?.name} (${selectedOccupation?.code}) to:`,
            14.82,
            23
          );
          pdf.setFontSize(10);
          pdf.text(
            `This treemap shows where ${selectedOccupation?.name} move to when they switch occupations. This data was calculated by academic researchers from around 16 million resumes of U.S. workers which were generously provided and parsed by Burning Glass Technologies`,
            11.3,
            197.85,
            { maxWidth: 254.35 }
          );
        })
        .then(() => pdf.save('treemap_report'));
    }
  };

  const [toggle, setToggle] = useState('fill');

  const [selectedValue, setSelectedValue] = useState<
    'occupationDisplay' | 'salaryDisplay'
  >('occupationDisplay');

  const chooseToggle = () => {
    console.log('Toggle!');
    toggle === 'fill' ? setToggle('opacity') : setToggle('fill');
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
        <RadioGroup
          value={selectedValue}
          onChange={chooseToggle}
          row
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <FormControlLabel
            value="occupationDisplay"
            control={<GreenRadio />}
            onChange={() => setSelectedValue('occupationDisplay')}
            label="Occupation"
            checked={selectedValue === 'occupationDisplay'}
          />
          <FormControlLabel
            value="salaryDisplay"
            control={<GreenRadio />}
            onChange={() => setSelectedValue('salaryDisplay')}
            label={`Salary ${selectedState ? selectedState.name : ''}`}
            checked={selectedValue === 'salaryDisplay'}
          />
        </RadioGroup>
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
            <TreemapWrapper
              display={toggle}
              selectedOccupation={selectedOccupation}
              selectedState={selectedState}
              transitions={transitions}
            />
          );
        }
      })()}
    </Column>
  );
};

export default Results;
