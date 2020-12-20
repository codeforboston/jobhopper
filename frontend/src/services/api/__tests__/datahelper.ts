import { Transition } from '../../../domain/transition';
import DataHelper from '../DataHelper';
import FakeApi from '../FakeApi';

describe('Testing Data Helper Functions', () => {
  it('transforms transitions', async () => {
    const api = new FakeApi();
    const transitions: Transition[] = await api.getTransitions({
      socCode: '12345',
    });
    expect(DataHelper.transformNumber(NaN, 1)).toBe(NaN);
    expect(DataHelper.transformNumber(-10, 2)).toBe(NaN);
    expect(DataHelper.transformNumber(NaN, NaN)).toBe(NaN);
    expect(DataHelper.transformNumber(10.01, -2)).toBe(NaN);
    expect(DataHelper.transformNumber(0.00001, 100)).toBe(NaN);
    expect(DataHelper.transformNumber(-0.1, 9)).toBe(NaN);

    transitions.forEach(
      ({ name, code, annualSalary, hourlyPay, transitionRate }) => {
        const precisionDigits: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        precisionDigits.forEach(num => {
          const newval = DataHelper.transformNumber(transitionRate, num);
          //  Ensure rounding never carries the precision too far.
          const upperbound: number = transitionRate + 1;
          const lowerbound: number = transitionRate - 1;
          expect(newval).toBeGreaterThan(lowerbound);
          expect(newval).toBeLessThan(upperbound);
          expect(typeof newval).toBe('number');
        });
      }
    );
  });
});
