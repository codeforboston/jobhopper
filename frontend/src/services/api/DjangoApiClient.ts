import axiosModule, { AxiosInstance } from 'axios';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { Transition } from 'src/domain/transition';
import Api, { GetTransitionRequest } from './Api';
import { array, occupation, transition, state } from './converters';

export class DjangoApiClient implements Api {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axiosModule.create({
      baseURL:
        process.env.REACT_APP_BASE_API_URL ||
        'http://localhost:8000/api/v1/jobs',
      timeout: 5000,
    });
  }

  getOccupations(): Promise<Occupation[]> {
    return this.axios
      .get('/soc-list')
      .then(response => response.data)
      .then((data: unknown) => array(data, occupation));
  }

  getStates(): Promise<State[]> {
    return this.axios
      .get('/state')
      .then(response => response.data)
      .then((data: unknown) => array(data, state));
  }

  getTransitions(request: GetTransitionRequest): Promise<Transition[]> {
    return this.axios
      .get('/transitions-extended', {
        params: {
          soc: request.sourceOccupation.code,
          min_transition_probability: 0.02,
          area_title: request.state?.name,
        },
      })
      .then(response => response.data)
      .then((data: unknown) =>
        array((data as any).transition_rows, transition)
      );
  }
}
