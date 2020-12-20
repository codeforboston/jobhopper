import React from 'react';
import MaterialTable from 'material-table';
import { Transition } from '../domain/transition';
import { useTheme } from '@material-ui/core';

export interface TransitionTableProps {
  transitionData: Transition[];
}

const TransitionTable = ({
  transitionData,
}: TransitionTableProps): JSX.Element => {
  const theme = useTheme();

  return (
    <MaterialTable
      tableRef={(ref: any) =>
        (ref?.tableContainerDiv?.current as HTMLDivElement)?.scrollIntoView({
          behavior: 'smooth',
        })
      }
      style={{ alignSelf: 'center', width: '90vw' }}
      columns={[
        { title: 'SOC', field: 'code' },
        { title: 'Job name', field: 'name' },
        {
          title: 'Transition share',
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
      title="Job Transitions"
      options={{
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
