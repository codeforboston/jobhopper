import React from 'react';

import ReactSelect, { Props } from 'react-select';
import { Occupation } from '../domain/occupation';
import { State } from '../domain/state';

export type SelectProps<T> = Props<T>;
export const Select = <T,>({
  options,
  getOptionLabel,
  getOptionValue,
  placeholder,
  ...rest
}: SelectProps<T>): JSX.Element => (
  <ReactSelect
    placeholder={placeholder}
    isSearchable
    options={options}
    getOptionLabel={getOptionLabel}
    getOptionValue={getOptionValue}
    styles={{
      menu: base => ({ ...base, zIndex: 100 }),
    }}
    {...rest}
  />
);

export interface OccupationSelectProps
  extends Omit<SelectProps<Occupation>, 'options'> {
  occupations: Occupation[];
}

export const OccupationSelect = ({
  occupations,
  ...rest
}: OccupationSelectProps): JSX.Element => (
  <Select
    options={occupations}
    placeholder={'Select occupation...'}
    getOptionLabel={({ name, code }) => `${code} | ${name}`}
    getOptionValue={({ code }) => code}
    {...rest}
  />
);

export interface StateSelectProps extends Omit<SelectProps<State>, 'options'> {
  states: State[];
}

export const StateSelect = ({
  states,
  ...rest
}: StateSelectProps): JSX.Element => (
  <Select
    options={states}
    isClearable
    placeholder={'Select state...'}
    getOptionLabel={({ name }) => name}
    getOptionValue={({ name }) => name}
    {...rest}
  />
);
