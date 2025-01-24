import { ReactNode } from 'react';
import { NotificationContext } from '../../data/contexts';
import useToaster from 'rsuite/useToaster';
import Message from 'rsuite/Message';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

export const NotificationProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const toaster = useToaster();

  const createNotifier = (type: NotificationType) => {
    return (text: string) => {
      toaster.push(<Message showIcon type={type}>{text}</Message>, {
        duration: 2000,
        mouseReset: true,
        placement: 'topCenter',
      });
    };
  };

  const notify = {
    success: createNotifier('success'),
    error: createNotifier('error'),
    info: createNotifier('info'),
    warning: createNotifier('warning'),
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
    </NotificationContext.Provider>
  );
};