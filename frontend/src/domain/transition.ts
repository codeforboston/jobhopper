export interface Transition {
  code: string;
  name: string;
  transitionRate: number;
  hourlyPay: number;
  annualSalary: number;
}

export const getCategory = (transition: Transition) =>
  parseInt(transition.code.slice(0, 2));

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
