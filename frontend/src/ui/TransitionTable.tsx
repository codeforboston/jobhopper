import React from 'react';
import MaterialTable, { Column } from 'material-table';
import { Transition } from '../domain/transition';
import { useTheme } from '@material-ui/core';
import { Tooltip, TableCell } from '@material-ui/core';
// import { data } rom ''

export interface TransitionTableProps {
  transitionData: Transition[];
}

export interface ToolTipProps {
  title: string;
  tooltip: string;
}

type Data = any; //TODO:  find the real source of type Data

const HeaderWithTooltip = ({ title, tooltip }: ToolTipProps) => {
  return (
    <Tooltip title={tooltip} placement="top">
      <TableCell>{title}</TableCell>
    </Tooltip>
  );
};

const TransitionTable = ({
  transitionData,
}: TransitionTableProps): JSX.Element => {
  const theme = useTheme();

  const [columns, setColumns] = React.useState<Array<Column<Data>>>([
    {
      title: <HeaderWithTooltip title="Name" tooltip="Name of the data" />,
      field: 'name',
    },
  ]);

  return (
    <MaterialTable
      columns={[
        {
          title: <HeaderWithTooltip title="SOC" tooltip="Name of the data" />,
          field: 'code',
        },
        {
          title: (
            <HeaderWithTooltip title="JobName" tooltip="Name of the data" />
          ),
          field: 'name',
        },
        {
          title: (
            <HeaderWithTooltip
              title="Transition share"
              tooltip="Name of the data"
            />
          ),
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
