import React from 'react';
import MaterialTable from 'material-table';
import { Transition } from '../domain/transition';
import { useTheme } from '@material-ui/core';
import OnetLink from './OnetLink';
import DataHelper from 'src/services/api/DataHelper';

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
      title="Job Transitions"
      options={{
        thirdSortClick: false,
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
