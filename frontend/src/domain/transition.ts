export interface Transition {
  code: string;
  name: string;
  transitionRate: number;
  hourlyPay: number;
  annualSalary: number;
}

type TransitionTuple = [string, string, number, number, number];

const createTransition = ([
  code,
  name,
  transitionRate,
  hourlyPay,
  annualSalary,
]: TransitionTuple): Transition => ({
  code,
  name,
  transitionRate,
  hourlyPay,
  annualSalary,
});

export const createTransitions = (
  transitions: TransitionTuple[]
): Transition[] => transitions.map(createTransition);

export const majorLookup = new Map<number, string>();
majorLookup.set(11, 'Management Occupations');
majorLookup.set(13, 'Business and Financial Operations Occupations');
majorLookup.set(15, 'Computer and Mathematical Occupations');
majorLookup.set(17, 'Architecture and Engineering Occupations');
majorLookup.set(19, 'Life, Physical, and Social Science Occupations');
majorLookup.set(21, 'Community and Social Service Occupations');
majorLookup.set(23, 'Legal Occupations');
majorLookup.set(25, 'Education, Training, and Library Occupations');
majorLookup.set(
  27,
  'Arts, Design, Entertainment, Sports, and Media Occupations'
);
majorLookup.set(29, 'Healthcare Practitioners and Technical Occupations');
majorLookup.set(31, 'Healthcare Support Occupations');
majorLookup.set(33, 'Protective Service Occupations');
majorLookup.set(35, 'Food Preparation and Serving Related Occupations');
majorLookup.set(
  37,
  'Building and Grounds Cleaning and Maintenance Occupations'
);
majorLookup.set(39, 'Personal Care and Service Occupations');
majorLookup.set(41, 'Sales and Related Occupations');
majorLookup.set(43, 'Office and Administrative Support Occupations');
majorLookup.set(45, 'Farming, Fishing, and Forestry Occupations');
majorLookup.set(47, 'Construction and Extraction Occupations');
majorLookup.set(49, 'Installation, Maintenance, and Repair Occupations');
majorLookup.set(51, 'Production Occupations');
majorLookup.set(53, 'Transportation and Material Moving Occupations');
majorLookup.set(55, 'Military Specific Occupations');

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
