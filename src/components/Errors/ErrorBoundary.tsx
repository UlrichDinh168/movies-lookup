import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  return (
    <div>{children}</div>
  );
};

export default ErrorBoundary;
