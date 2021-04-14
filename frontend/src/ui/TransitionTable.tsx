import { Typography, useTheme } from '@material-ui/core';
import MaterialTable from 'material-table';
import React, { useCallback } from 'react';
import { Occupation } from 'src/domain/occupation';
import DataHelper from 'src/services/api/DataHelper';
import { Transition } from '../domain/transition';
import OnetLink from './OnetLink';
import { Body } from './Typography';

export interface TransitionTableProps {
  selectedOccupation: Occupation;
  transitionData: Transition[];
}

const centerWide = { alignSelf: 'center', width: '90vw' };

const TransitionTable = ({
  selectedOccupation,
  transitionData,
}: TransitionTableProps): JSX.Element => {
  const theme = useTheme();

  const title = `Which occupations do ${selectedOccupation.name}  (${selectedOccupation.code}) move to?`;

  const scrollToOnMount = useCallback((ref: any) => {
    console.log('ref', ref);
    (ref?.tableContainerDiv?.current as HTMLDivElement)?.scrollIntoView?.({
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <MaterialTable
        tableRef={scrollToOnMount}
        style={centerWide}
        columns={[
          {
            title: 'SOC code',
            field: 'code',
            tooltip:
              'The Standard Occupational Classification (SOC) system is a federal statistical standard used by federal agencies to classify workers into occupational categories for the purpose of collecting, calculating, or disseminating data. These codes are 6-digit SOC codes using the 2010 classification system.',
          },
          {
            title: 'Occupation name',
            field: 'name',
            render: ({ code, name }) => (
              <OnetLink socCode={code} occupation={name}>
                {name}
              </OnetLink>
            ),
            tooltip:
              'Shows occupation that workers in the selected occupation switch into. Clicking on the occupation will take you to the Bureau of Labor Statistics’ O*NET page for that occupation.',
            width: 1000,
          },
          {
            title: 'Transition share',
            field: 'transitionRate',
            render: ({ transitionRate }) =>
              `${DataHelper.transformNumber(100 * transitionRate, 2)}%`,
            tooltip:
              'This data focuses on workers who move from one occupation to another. The transition share is the percentage of workers from the selected occupation who move into each destination occupation, when they leave their occupation. This is calculated from national data using 16 million workers’ resumes.',
            defaultSort: 'desc',
          },
          {
            title: 'Average hourly pay',
            field: 'hourlyPay',
            type: 'currency',
            tooltip:
              'Average hourly pay in this occupation, obtained from the Bureau of Labor Statistics Occupational Employment Statistics database. This shows nationwide pay unless you have selected a specific state.',
          },
          {
            title: 'Average annual salary',
            field: 'annualSalary',
            type: 'currency',
            render: ({ annualSalary }) =>
              `$${Math.floor(annualSalary)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            tooltip:
              'Average annual salary in this occupation, obtained from the Bureau of Labor Statistics Occupational Employment Statistics database. This shows nationwide salary unless you have selected a specific state.',
          },
        ]}
        data={transitionData}
        title={<Title>{title}</Title>}
        options={{
          thirdSortClick: false,
          exportButton: true,
          exportFileName: title,
          exportAllData: true,
          rowStyle: (_, index) => ({
            backgroundColor:
              index % 2 === 0 ? 'white' : theme.colors.primaryHighlight,
          }),
          headerStyle: {
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            backgroundColor: theme.palette.primary.light,
          },
        }}
      />
      <Explanation occupationName={selectedOccupation.name} />
    </>
  );
};

const Title: React.FC = ({ children }) => (
  <Typography variant="h6" style={{ marginTop: '12px', marginBottom: '12px' }}>
    {children}
  </Typography>
);

const Explanation = ({ occupationName }: { occupationName: string }) => (
  <Body style={centerWide}>
    The table above shows the occupations which {occupationName} move to when
    they change occupation based on the observations in our dataset. The
    transition share is the percentage of these observed {occupationName} who
    have moved into each of the occupations listed. Only transition shares
    greater than 0.2% are shown. The information related to salary information
    is sourced from bls and includes 2017 to 2019 with a preference for the most
    recent data per soc code.
  </Body>
);

export default TransitionTable;
