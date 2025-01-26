import { createContext } from 'react';

export const NotificationContext = createContext<{
  notify: {
    success: (text: string) => void;
    error: (text: string) => void;
    info: (text: string) => void;
    warning: (text: string) => void;
  };
} | null>(null);