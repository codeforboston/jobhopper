import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import DjangoApiClient from '../DjangoApiClient';

const sourceOccupation: Occupation = {
  code: '15-1131',
  name: 'Computer Programmers',
};

const selectedState: State = {
  abbreviation: 'MA',
  name: 'Massachusetts',
};

describe('DjangoApiClient', () => {
  it('Can be constructed', () => {
    expect(new DjangoApiClient()).toBeDefined();
  });

  describe('Operations', () => {
    let client: DjangoApiClient;
    beforeEach(() => {
      client = new DjangoApiClient();
    });

    it('Fetches Occupations (SOC list)', async () => {
      const occupations = await client.getOccupations();
      expect(occupations).not.toHaveLength(0);
      expect(occupations).toContainEqual(sourceOccupation);
    });

    it('Fetches State list', async () => {
      const states = await client.getStates();
      expect(states).not.toHaveLength(0);
      expect(states).toContainEqual(selectedState);
    });

    it('Fetches national transitions', async () => {
      await expect(
        client.getTransitions({
          sourceOccupation,
        })
      ).resolves.not.toHaveLength(0);
    });

    it('Fetches state transitions', async () => {
      await expect(
        client.getTransitions({
          sourceOccupation,
          state: selectedState,
        })
      ).resolves.not.toHaveLength(0);
    });
  });
});
