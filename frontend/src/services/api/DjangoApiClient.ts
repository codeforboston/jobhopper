import axiosModule, { AxiosInstance } from 'axios';
import { sortBy } from 'lodash';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { Transition } from 'src/domain/transition';
import Api, { GetTransitionRequest } from './Api';
import { array, occupation, transition, state } from './converters';

export default class DjangoApiClient implements Api {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axiosModule.create({
      baseURL:
        process.env.REACT_APP_BASE_API_URL ||
        'http://localhost:8000/api/v1/jobs',
      timeout: 5000,
    });
  }

  getOccupations(request: string): Promise<Occupation[]> {
    /*
     * Get occupations from the soc-smart-list Django API endpoint based on parameters defined in Api.ts
     * Limit O*NET results to 30 (to be filtered against existing transitions data)
     * Limit occupations returned to those with over 2000 (weighted) observations
     */
    return this.axios
      .get('/soc-smart-list/', {
        params: {
          keyword_search: request,
          onet_limit: 30,
          min_weighted_obs: 2000,
        },
      })
      .then(response => response.data)
      .then((data: unknown) => array(data, occupation))
      .then(occupations => {
        if (request === '') {
          return sortBy(occupations, ({ code }) => code);
        }
        return occupations;
      });
  }

  getStates(): Promise<State[]> {
    return this.axios
      .get('/state/')
      .then(response => response.data)
      .then((data: unknown) => array(data, state));
  }

  getTransitions(request: GetTransitionRequest): Promise<Transition[]> {
    return this.axios
      .get('/transitions-extended/', {
        params: {
          soc: request.sourceOccupation.code,
          min_transition_probability: 0,
          area_title: request.state?.name,
        },
      })
      .then(response => response.data)
      .then((data: unknown) =>
        array((data as any).transition_rows, transition)
      );
  }
}
