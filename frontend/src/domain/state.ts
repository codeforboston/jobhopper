export interface State {
  name: string;
}

export const createStates = (states: string[]): State[] =>
  states.map(name => ({ name }));
