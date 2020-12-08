import { Occupation } from '../../domain/occupation';
import { State } from '../../domain/state';
import { Transition } from '../../domain/transition';

export type GetTransitionRequest = {
  state?: string;
  socCode: string;
};

export default interface Api {
  getOccupations: () => Promise<Occupation[]>;

  getStates: () => Promise<State[]>;

  getTransitions: (request: GetTransitionRequest) => Promise<Transition[]>;
}
