import React from 'react';
import MaterialTable from 'material-table';
import { Transition } from '../domain/transition';
import { useTheme } from '@material-ui/core';
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
      columns={[
        { title: 'SOC', field: 'code' },
        { title: 'Job name', field: 'name' },
        {
          title: 'Transition share',
          field: 'transitionRate',
          render: ({ transitionRate }) =>
            `${(10 * transitionRate).toFixed(2)}%`,
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
      title={title}
      options={{
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

export default TransitionTable;
