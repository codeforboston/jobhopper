import React from 'react';
import MaterialTable from 'material-table';
import { Transition } from '../domain/transition';
import { useTheme } from '@material-ui/core';
import { Tooltip, TableCell } from '@material-ui/core';

export interface TransitionTableProps {
  transitionData: Transition[];
}

const createHeaderWithTooltip = (title: string, tooltip: string) => {
  return (
    <Tooltip title={tooltip} placement='top'>
      <TableCell>{title}</TableCell>
    </Tooltip>
  );
};

const [columns, setColumns] = React.useState<Array<Column<Data>>>([
  { title: createHeaderWithTooltip('Name', 'Name of the data'), field: 'name' },
]);

const TransitionTable = ({
  transitionData,
}: TransitionTableProps): JSX.Element => {
  const theme = useTheme();

  return (
    <MaterialTable
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
