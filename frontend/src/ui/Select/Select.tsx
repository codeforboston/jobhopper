import { useTheme } from '@material-ui/core';
import React from 'react';
import ReactSelect, { Props as SyncProps } from 'react-select';
import AsyncSelect, { Props as AsyncProps } from 'react-select/async';
import { Occupation } from '../../domain/occupation';
import { State } from '../../domain/state';

interface StatusProps {
  loading?: boolean;
  error?: string;
  disabled?: boolean;
}

export interface SelectProps<T> extends SyncProps<T>, StatusProps {}

export const Select = <T,>({
  options,
  getOptionLabel,
  getOptionValue,
  placeholder,
  loading,
  error,
  disabled,
  ...rest
}: SelectProps<T>): JSX.Element => {
  const theme = useTheme();
  return (
    <div>
      <ReactSelect
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
        isDisabled={disabled || loading || !!error}
        {...rest}
      />
    </div>
  );
};

export interface AsyncSelectProps<T> extends AsyncProps<T>, StatusProps {}

export const SelectAsync = <T,>({
  getOptionLabel,
  getOptionValue,
  placeholder,
  loading,
  error,
  disabled,
  loadOptions,
  ...rest
}: AsyncSelectProps<T>): JSX.Element => {
  const theme = useTheme();
  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        placeholder={loading ? 'Loading...' : error || placeholder}
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
        isDisabled={disabled || loading || !!error}
        {...rest}
      />
    </div>
  );
};

export interface OccupationSelectProps
  extends Omit<AsyncSelectProps<Occupation>, 'loadOptions'> {
  fetchOptions: (input: string) => void | Promise<Occupation[]>;
  onSelectOccupation?: (occupation: Occupation) => void;
}

export const OccupationSelect = ({
  occupations,
  onSelectOccupation = () => {},
  fetchOptions: loadOptions = (input: string) => {},
  ...rest
}: OccupationSelectProps): JSX.Element => (
  <SelectAsync<Occupation>
    loadOptions={loadOptions}
    aria-label="occupation-select"
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
    aria-label="state-select"
    options={states}
    isClearable
    placeholder={'Select state...'}
    getOptionLabel={({ name }) => name}
    getOptionValue={({ name }) => name}
    {...rest}
  />
);
