import { ReactNode } from 'react';
import Text from 'rsuite/Text';

type ErrorMessageProps = {
  message: string | undefined;
  children: ReactNode;
};

const ErrorMessage = ({ children, message }: ErrorMessageProps): ReactNode => {
  return (
    <div style={{ position: 'relative' }}>
      {children}
      {message && (
        <Text
          color="red"
          size="sm"
          style={{ position: 'absolute', bottom: '-20px' }}
        >
          {message}
        </Text>
      )}
    </div>
  );
};

export default ErrorMessage;