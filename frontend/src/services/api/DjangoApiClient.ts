import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { Transition } from 'src/domain/transition';
import Api, { GetTransitionRequest } from './Api';

export class DjangoApiClient implements Api {
  getOccupations(): Promise<Occupation[]> {
    return Promise.resolve([]);
  }
  getStates(): Promise<State[]> {
    return Promise.resolve([]);
  }
  getTransitions(request: GetTransitionRequest): Promise<Transition[]> {
    return Promise.resolve([]);
  }
}
