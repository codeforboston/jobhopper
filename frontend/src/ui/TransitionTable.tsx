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

  const title = `Job Transitions from ${selectedOccupation.name} (${
    selectedOccupation.code
  }) ${selectedState ? `in ${selectedState.name}` : `Nationally`}`;

  return (
    <MaterialTable
      tableRef={(ref: any) =>
        (ref?.tableContainerDiv?.current as HTMLDivElement)?.scrollIntoView({
          behavior: 'smooth',
        })
      }
      style={{ alignSelf: 'center', width: '90vw' }}
      columns={[
        {
          title: 'SOC code',
          field: 'code',
          tooltip:
            'The Standard Occupational Classification (SOC) system is a federal statistical standard used by federal agencies to classify workers into occupational categories for the purpose of collecting, calculating, or disseminating data.',
        },
        {
          title: 'Job name',
          field: 'name',
          render: ({ code, name }) => (
            <OnetLink socCode={code}>{name}</OnetLink>
          ),
          width: 1000,
        },
        {
          title: 'Transition share',
          field: 'transitionRate',
          render: ({ transitionRate }) =>
            `${DataHelper.transformNumber(10 * transitionRate, 2)}%`,
          tooltip:
            'The proportion of individuals in the selected occupation that switch to this job in a given year',
          defaultSort: 'desc',
        },
        {
          title: 'Hourly pay',
          field: 'hourlyPay',
          type: 'currency',
        },
        {
          title: 'Annual salary',
          field: 'annualSalary',
          type: 'currency',
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
