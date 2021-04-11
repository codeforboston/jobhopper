import { useTheme } from '@material-ui/core';
import { type } from 'os';
import React from 'react';

import ReactSelect, { Props } from 'react-select';
import AsyncSelect from 'react-select/async';

import { Occupation } from '../../domain/occupation';
import { State } from '../../domain/state';
import DjangoApiClient from '../../services/api/DjangoApiClient';

export interface SelectProps<T> extends Props<T> {
  loading?: boolean;
  error?: string;
  disabled?: boolean;
}

const fetchMatchOccupations = async (input: string) => {
  /*
   * Fetch occupations matching the given input string via the soc-smart-list endpoint in the DjangoApiClient
   */
  console.log('Fetching occupations matching the input ' + input);
  // TODO: Change the input.length to input complete
  if (input.length >= 0) {
    const client = new DjangoApiClient();
    const occupations = await client.getOccupations(input);

    // Sort by occupation SOC code if there is not input yet
    if (input === '') {
      occupations.sort((job1, job2) => job1.code.localeCompare(job2.code));
    }

    // Each occupation has the name and code attributes. These attributes are handled by OccupationSele
    return occupations.map(function (occupation) {
      return occupation;
    });
  }
};

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

export const SelectAsync = <T,>({
  options,
  getOptionLabel,
  getOptionValue,
  placeholder,
  loading,
  error,
  disabled,
  fetchOptions = (input: string) => {},
  ...rest
}: SelectProps<T>): JSX.Element => {
  const theme = useTheme();
  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={fetchOptions}
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
  <SelectAsync
    loadOptions={fetchMatchOccupations}
    aria-label="occupation-select"
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
    aria-label="state-select"
    options={states}
    isClearable
    placeholder={'Select state...'}
    getOptionLabel={({ name }) => name}
    getOptionValue={({ name }) => name}
    {...rest}
  />
);
