import { useEffect, useRef, useState } from 'react';

export const useDynamicHeight = (minHeight = 300, offset = 40) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(minHeight);

  const updateHeight = (): void => {
    if (containerRef.current) {
      setHeight(Math.max(window.innerHeight - containerRef.current.offsetTop - offset, minHeight));
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [minHeight, offset]);

  return { containerRef, height };
};