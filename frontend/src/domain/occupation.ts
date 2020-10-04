export interface Occupation {
  code: string;
  name: string;
}

type OccupationTuple = [string, string];

const createOccupation = ([code, name]: OccupationTuple): Occupation => ({
  code,
  name,
});

export const createOccupations = (
  occupations: OccupationTuple[]
): Occupation[] => occupations.map(createOccupation);
