import defaultApi from '..';
import FakeApi from '../FakeApi';
import { Occupation } from '../../../domain/occupation';
import { Transition } from '../../../domain/transition';
import { State } from '../../../domain/state';
import occupations from 'src/testing/data/occupations';

describe('Fake API', () => {
  it('Fake can be constructed', () => {
    expect(new FakeApi()).toBeDefined();
  });

  it('is provided by default', () => {
    expect(defaultApi).toBeInstanceOf(FakeApi);
  });

  it('retrieves occupations', async () => {
    const api = new FakeApi();
    const occupations: Occupation[] = await api.getOccupations();
    occupations.forEach(({ name, code }) => {
      expect(typeof name).toBe('string');
      expect(typeof code).toBe('string');
    });
  });

  it('retrieves states', async () => {
    const api = new FakeApi();
    const states: State[] = await api.getStates();
    states.forEach(({ name, abbreviation }) => {
      expect(typeof name).toBe('string');
      expect(typeof abbreviation).toBe('string');
      expect(abbreviation).toHaveLength(2);
    });
  });

  it('retrieves transitions', async () => {
    const api = new FakeApi();
    const transitions: Transition[] = await api.getTransitions({
      sourceOccupation: occupations[0],
    });
    transitions.forEach(
      ({ name, code, annualSalary, hourlyPay, transitionRate }) => {
        expect(typeof name).toBe('string');
        expect(typeof code).toBe('string');
        expect(typeof annualSalary).toBe('number');
        expect(typeof hourlyPay).toBe('number');
        expect(typeof transitionRate).toBe('number');
      }
    );
  });
});
