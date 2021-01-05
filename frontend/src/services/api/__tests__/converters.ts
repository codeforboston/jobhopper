import {
  array,
  occupation,
  state,
  transition,
  ConversionError,
} from '../converters';

describe('Converters', () => {
  it('array accepts valid arrays', () => {
    expect(array<number>(['1', '2', '3'], Number)).toEqual([1, 2, 3]);
  });

  it('array rejects invalid arrays', () => {
    expect(() => array<number>('1', Number)).toThrow();
  });

  it('array drops invalid items', () => {
    const unconverted = ['1', 2],
      expectedConverted = [2],
      converted = array<number>(unconverted, value => {
        if (typeof value === 'number') {
          return value;
        }
        throw new ConversionError();
      });

    expect(converted).toEqual(expectedConverted);
  });

  it.each([
    [
      'occupation',
      {
        converter: occupation,
        valid: [{ soc_code: '15-1251', soc_title: 'Computer Programmers' }],
        invalid: [
          { soc_code: '12345' },
          { soc_title: 'occupation' },
          { soc_code: 123, soc_title: 'occupation' },
        ],
      },
    ],
    [
      'transition',
      {
        converter: transition,
        valid: [
          {
            pi: 0.021829652,
            soc2_soc_code: '11-9199',
            soc2_soc_title: 'Managers, All Other',
            soc2_hourly_mean_wage: 55.57,
            soc2_annual_mean_wage: 115590,
          },
        ],
        invalid: [
          {
            soc2_soc_title: 'Managers, All Other',
            soc2_hourly_mean_wage: 55.57,
            soc2_annual_mean_wage: 115590,
          },
          {},
        ],
      },
    ],
    [
      'state',
      {
        converter: state,
        valid: [{ abbreviation: 'KS', state_name: 'Kansas' }],
        invalid: [{ state_name: 'Kansas' }, { abbreviation: 'KS' }],
      },
    ],
  ])('%s correctly converts objects', (name, { converter, valid, invalid }) => {
    valid.forEach((item: unknown) => {
      expect(converter(item)).toBeDefined();
    });
    invalid.forEach((item: unknown) => {
      expect(() => converter(item)).toThrow();
    });
  });
});
