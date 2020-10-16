import { fetchStates } from '../states';
import { fetchOccupations } from '../occupations';
import { createStore } from '../store';
import api from '../../services/api';
import states from '../../testing/data/states';
import occupations from '../../testing/data/occupations';
import { mocked } from 'ts-jest/utils';

jest.mock('../../services/api');
const mockedApi = mocked(api);

describe('Store', () => {
  it('can be constructed', () => {
    const store = createStore();
    expect(store).toBeDefined();
  });
});

describe('States', () => {
  it('updates the list of states', async () => {
    const store = createStore();
    expect(store.getState().states.states).toHaveLength(0);

    mockedApi.getStates.mockResolvedValue(states);

    await store.dispatch(fetchStates());
    expect(store.getState().states.states).toEqual(states);
  });

  it('handles update errors', async () => {
    const store = createStore();
    expect(store.getState().states.states).toHaveLength(0);

    const errorMessage = 'test error fetching';
    mockedApi.getStates.mockRejectedValue(new Error(errorMessage));

    await store.dispatch(fetchStates());
    expect(store.getState().states.error).toEqual(errorMessage);
  });
});

describe('Occupations', () => {
  it('updates the list of occupations', async () => {
    const store = createStore();
    expect(store.getState().occupations.occupations).toHaveLength(0);

    mockedApi.getOccupations.mockResolvedValue(occupations);

    await store.dispatch(fetchOccupations());
    expect(store.getState().occupations.occupations).toEqual(occupations);
  });

  it('handles update error', async () => {
    const store = createStore();
    expect(store.getState().occupations.occupations).toHaveLength(0);

    const errorMessage = 'test error fetching';
    mockedApi.getOccupations.mockRejectedValue(new Error(errorMessage));

    await store.dispatch(fetchOccupations());
    expect(store.getState().occupations.error).toEqual(errorMessage);
  });
});
