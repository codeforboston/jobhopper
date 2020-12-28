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
    <div data-testid={testId}>
      <ReactSelect
        placeholder={error || placeholder}
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
      />
    </div>
  );
};

export interface OccupationSelectProps
  extends Omit<SelectProps<Occupation>, 'options'> {
  occupations: Occupation[];
  onSelectOccupation?: (occupationCode: string) => void;
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
      const code: string | undefined = (occupation as Occupation)?.code;
      if (code) {
        onSelectOccupation(code);
      }
    }}
    {...rest}
  />
);

export interface StateSelectProps extends Omit<SelectProps<State>, 'options'> {
  states: State[];
  onSelectState?: (state?: string) => void;
}

export const StateSelect = ({
  states,
  onSelectState = () => {},
  ...rest
}: StateSelectProps): JSX.Element => (
  <Select
    onChange={state => {
      const abbreviation: string | undefined = (state as State)?.abbreviation;
      onSelectState(abbreviation);
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
