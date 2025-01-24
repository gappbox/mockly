import { useEffect } from 'react';

export const useSplashScreen = () => {
  const splash = document.getElementById('splash');
  const delay = 300;

  useEffect(() => {
    setTimeout(() => {
      if (splash) {
        splash.style.opacity = '0';
        setTimeout(() => splash.remove(), delay);
      }
    }, delay);
  }, []);
};