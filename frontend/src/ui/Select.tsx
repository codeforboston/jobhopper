import React from 'react';

import ReactSelect, { OptionsType } from 'react-select';

export interface SelectProps<T> {
  options: OptionsType<T>;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
}

export const Select = <T,>({
  options,
  getOptionLabel,
  getOptionValue,
}: SelectProps<T>): JSX.Element => (
  <ReactSelect
    isSearchable={true}
    options={options}
    getOptionLabel={getOptionLabel}
    getOptionValue={getOptionValue}
  />
);
