import { Occupation } from '../jobs';

type OccupationTuple = [string, string];

const createOccupation = ([code, name]: OccupationTuple): Occupation => ({
  code,
  name,
});

const occupations: Array<OccupationTuple> = [
  ['01-1234', 'Janitor'],
  ['01-2345', 'Doctor'],
  ['01-3456', 'Waiter and Waitresses'],
];

export default occupations.map(createOccupation);
