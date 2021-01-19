export interface Transition {
  code: string;
  majorGroup?: string;
  name: string;
  transitionRate: number;
  hourlyPay: number;
  annualSalary: number;
}

type TransitionTuple = [string, string | undefined, string, number, number, number];

const createTransition = ([
  code,
  majorGroup,
  name,
  transitionRate,
  hourlyPay,
  annualSalary,
]: TransitionTuple): Transition => ({
  code,
  majorGroup,
  name,
  transitionRate,
  hourlyPay,
  annualSalary,
});

export const createTransitions = (
  transitions: TransitionTuple[]
): Transition[] => transitions.map(createTransition);




/*


majorgroup	majorname
11 - 0000	Management Occupations
13 - 0000	Business and Financial Operations Occupations
15 - 0000	Computer and Mathematical Occupations
17 - 0000	Architecture and Engineering Occupations
19 - 0000	Life, Physical, and Social Science Occupations
21 - 0000	Community and Social Service Occupations
23 - 0000	Legal Occupations
25 - 0000	Education, Training, and Library Occupations
27 - 0000	Arts, Design, Entertainment, Sports, and Media Occupations
29 - 0000	Healthcare Practitioners and Technical Occupations
31 - 0000	Healthcare Support Occupations
33 - 0000	Protective Service Occupations
35 - 0000	Food Preparation and Serving Related Occupations
37 - 0000	Building and Grounds Cleaning and Maintenance Occupations
39 - 0000	Personal Care and Service Occupations
41 - 0000	Sales and Related Occupations
43 - 0000	Office and Administrative Support Occupations
45 - 0000	Farming, Fishing, and Forestry Occupations
47 - 0000	Construction and Extraction Occupations
49 - 0000	Installation, Maintenance, and Repair Occupations
51 - 0000	Production Occupations
53 - 0000	Transportation and Material Moving Occupations
55 - 0000	Military Specific Occupations

*/
