export interface State {
  name: string;
  abbreviation: string;
}

type StateTuple = [string, string];

export const createStates = (states: StateTuple[]): State[] =>
  states.map(([name, abbreviation]) => ({ name, abbreviation }));
