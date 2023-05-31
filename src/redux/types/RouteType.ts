import { ReactElement } from 'react';

export type Route = {
  id: number;
  path: string;
  component: () => ReactElement;
};
