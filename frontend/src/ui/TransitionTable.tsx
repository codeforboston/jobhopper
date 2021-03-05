import React from 'react';
import MaterialTable from 'material-table';
import { Transition } from '../domain/transition';
import { Typography, useTheme } from '@material-ui/core';
import OnetLink from './OnetLink';
import DataHelper from 'src/services/api/DataHelper';
// leaving these two lines from develop branch. used in TransitionTableProps
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';

export interface TransitionTableProps {
  selectedOccupation: Occupation;
  selectedState?: State;
  transitionData: Transition[];
}

const TransitionTable = ({
  selectedState,
  selectedOccupation,
  transitionData,
}: TransitionTableProps): JSX.Element => {
  const theme = useTheme();

  const title = `Which occupations do ${selectedOccupation.name}  (${
    selectedOccupation.code
  }) move to ${selectedState ? `in ${selectedState.name}` : `Nationally`} ?`;

  return (
    <MaterialTable
      tableRef={(ref: any) =>
        (ref?.tableContainerDiv?.current as HTMLDivElement)?.scrollIntoView?.({
          behavior: 'smooth',
        })
      }
      style={{ alignSelf: 'center', width: '90vw' }}
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
  );
};

const Title: React.FC = ({ children }) => (
  <Typography variant="h6" style={{ marginTop: '12px', marginBottom: '12px' }}>
    {children}
  </Typography>
);

export default TransitionTable;
