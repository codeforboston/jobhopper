import { createContext, useContext } from 'react';

/**
 * Creates a context for typed container components and a hook for accessing it.
 */
export const createContainerContext = <ContextShape>(shape?: ContextShape) => {
  const ContainerContext = createContext(shape!);
  const useContainerContext = () => useContext(ContainerContext);

  return { ContainerContext, useContainerContext };
};
