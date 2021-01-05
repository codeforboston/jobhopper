import { Occupation } from 'src/domain/occupation';
import { Transition } from 'src/domain/transition';
import { State } from 'src/domain/state';

export function array<T>(data: unknown, converter: (data: unknown) => T): T[] {
  check(Array.isArray(data), 'data is not an array');
  const converted: T[] = [];
  (data as []).forEach((item: unknown) => {
    try {
      converted.push(converter(item));
    } catch (e) {
      if (e instanceof ConversionError) {
        console.warn(
          `Error converting ${converter.name} data:`,
          e.message,
          item
        );
      } else {
        throw e;
      }
    }
  });
  return converted;
}

export function occupation(data: unknown): Occupation {
  const { soc_code, soc_title } = data as {
    soc_code: string;
    soc_title: string;
  };

  checkStrings({ soc_code, soc_title });

  return { code: soc_code, name: soc_title };
}

export function transition(data: unknown): Transition {
  const {
    soc2_soc_code,
    soc2_soc_title,
    pi,
    soc2_hourly_mean_wage,
    soc2_annual_mean_wage,
  } = data as {
    soc2_soc_code: string;
    soc2_soc_title: string;
    pi: number;
    soc2_hourly_mean_wage: number;
    soc2_annual_mean_wage: number;
  };

  checkStrings({ soc2_soc_code, soc2_soc_title });
  checkNumbers({ pi, soc2_hourly_mean_wage, soc2_annual_mean_wage });

  return {
    code: soc2_soc_code,
    name: soc2_soc_title,
    transitionRate: pi,
    hourlyPay: soc2_hourly_mean_wage,
    annualSalary: soc2_annual_mean_wage,
  };
}

export function state(data: unknown): State {
  const { state_name, abbreviation } = data as {
    abbreviation: string;
    state_name: string;
  };

  checkStrings({ state_name, abbreviation });

  return { name: state_name, abbreviation };
}

const checkStrings = (strings: { [name: string]: unknown }) => {
  Object.entries(strings).forEach(([name, value]) => {
    check(value, `${name} is missing`);
    check(typeof value === 'string', `${name} is not a string`);
  });
};

const checkNumbers = (values: { [name: string]: unknown }) => {
  Object.entries(values).forEach(([name, value]) => {
    check(value, `${name} is missing`);
    check(typeof value === 'number', `${name} is not a number`);
  });
};

const check = (value: unknown, message: string) => {
  if (!value) {
    throw new ConversionError(message);
  }
};

export class ConversionError extends Error {}
