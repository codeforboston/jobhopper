import { Transition } from './transition';

export interface TreeHierarchy {
  name: string;
  children: Transition[];
}

export const createHierarchy = (
  name: string,
  transitions: Transition[]
): TreeHierarchy => ({
  name,
  children: transitions,
});
