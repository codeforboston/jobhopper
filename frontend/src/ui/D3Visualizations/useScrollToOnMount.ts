import { useEffect, useRef } from 'react';

export default function useScrollToOnMount<E extends HTMLElement>() {
  const ref = useRef<E>(null);
  useEffect(() => {
    ref.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, []);
  return ref;
}
