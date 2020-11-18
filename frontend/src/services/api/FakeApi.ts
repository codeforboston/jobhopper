import { Occupation } from '../../domain/occupation';
import { State } from '../../domain/state';
import { Transition } from '../../domain/transition';
import occupations from '../../testing/data/occupations';
import states from '../../testing/data/states';
import transitions from '../../testing/data/transitionData';
import Api from './Api';

export default class FakeApi implements Api {
  getTransitions: () => Promise<Transition[]> = () =>
    Promise.resolve(transitions);

  getStates: () => Promise<State[]> = () => Promise.resolve(states);

  getOccupations: () => Promise<Occupation[]> = () =>
    Promise.resolve(occupations);
}
