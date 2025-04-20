import { useEffect } from 'react';

export const useBlurOnClick = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      setTimeout(() => {
        const target = event.target as HTMLElement;
        const button = target.closest('.rs-btn') as HTMLElement | null;

        if (button) {
          button.blur();
        }
      });
    };

    document.addEventListener('pointerdown', handleClick);

    return () => {
      document.removeEventListener('pointerdown', handleClick);
    };
  }, []);
};