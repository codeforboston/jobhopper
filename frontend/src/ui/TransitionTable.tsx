import React from 'react';
import MaterialTable from 'material-table';
import { Transition } from '../domain/transition';

export interface TransitionTableProps {
  transitionData: Transition[];
}

const TransitionTable = ({
  transitionData,
}: TransitionTableProps): JSX.Element => (
  <MaterialTable
    columns={[
      { title: 'SOC', field: 'code' },
      { title: 'Job name', field: 'name' },
      { title: 'Transition share', field: 'transitionRate' },
      {
        title: 'Hourly pay',
        field: 'hourlyPay',
      },
      {
        title: 'Annual salary',
        field: 'annualSalary',
      },
    ]}
    data={transitionData}
    title="Job Transitions"
  />
);

export default TransitionTable;
