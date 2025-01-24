import { useEffect } from 'react';

export const useBlurOnClick = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      const button = target.closest('.rs-btn') as HTMLElement | null;

      if (button) {
        button.blur();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};