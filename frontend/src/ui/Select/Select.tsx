import { useTheme } from '@material-ui/core';
import React from 'react';

import ReactSelect, { Props } from 'react-select';
import { Occupation } from '../../domain/occupation';
import { State } from '../../domain/state';

export interface SelectProps<T> extends Props<T> {
  loading?: boolean;
  error?: string;
  testId?: string;
}

export const Select = <T,>({
  options,
  getOptionLabel,
  getOptionValue,
  placeholder,
  loading,
  error,
  testId,
  ...rest
}: SelectProps<T>): JSX.Element => {
  const theme = useTheme();
  return (
    <div>
      <label htmlFor={testId}>{testId}</label>
      <ReactSelect
        data-testid={testId}
        placeholder={loading ? 'Loading...' : error || placeholder}
        isSearchable
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        styles={{
          menu: base => ({ ...base, zIndex: 100 }),
          control: base => ({
            ...base,
            backgroundColor: theme.palette.primary.light,
          }),
          placeholder: base => ({
            ...base,
            color: error
              ? theme.palette.error.main
              : theme.palette.primary.main,
          }),
        }}
        isLoading={loading}
        isDisabled={loading || !!error}
        {...rest}
        inputId={testId}
      />
    </div>
  );
};

export interface OccupationSelectProps
  extends Omit<SelectProps<Occupation>, 'options'> {
  occupations: Occupation[];
  onSelectOccupation?: (occupation: Occupation) => void;
}

export const OccupationSelect = ({
  occupations,
  onSelectOccupation = () => {},
  ...rest
}: OccupationSelectProps): JSX.Element => (
  <Select
    testId="occupation-select"
    options={occupations}
    placeholder={'Select occupation...'}
    getOptionLabel={({ name, code }) => `${code} | ${name}`}
    getOptionValue={({ code }) => code}
    onChange={occupation => {
      if (occupation) {
        onSelectOccupation(occupation as Occupation);
      }
    }}
    {...rest}
  />
);

export interface StateSelectProps extends Omit<SelectProps<State>, 'options'> {
  states: State[];
  onSelectState?: (state?: State) => void;
}

export const StateSelect = ({
  states,
  onSelectState = () => {},
  ...rest
}: StateSelectProps): JSX.Element => (
  <Select
    onChange={state => {
      onSelectState(state as State);
    }}
    testId="state-select"
    options={states}
    isClearable
    placeholder={'Select state...'}
    getOptionLabel={({ name }) => name}
    getOptionValue={({ name }) => name}
    {...rest}
  />
);
