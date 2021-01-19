import { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface Dimensions {
  width: number;
  height: number;
}

const useResizeObserver = (
  ref: React.RefObject<HTMLDivElement>
): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const observeTarget = ref.current!;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
