import occupations from '../../testing/data/occupations';
import states from '../../testing/data/states';
import transitions from '../../testing/data/transitionData';
import Api, { GetTransitionRequest } from './Api';

const resolveWithDelay = <T>(value: T): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(value), 0));

export default class FakeApi implements Api {
  getTransitions = (request: GetTransitionRequest) => {
    console.log('FakeApi.getTransitions', request);
    return resolveWithDelay(transitions);
  };
  getStates = () => {
    console.log('FakeApi.getStates');
    return resolveWithDelay(states);
  };
  getOccupations = () => {
    console.log('FakeApi.getOccupations');
    return resolveWithDelay(occupations);
  };
}
