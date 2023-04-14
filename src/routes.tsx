import React from 'react';
import { useRoutes } from 'react-router-dom';
import Details from './components/Details.tsx';
import Main from './components/Main.tsx';

const AppRoutes = (props: any) => {

  const elements = useRoutes([
    {
      path: '/',
      element: <Main />
    },
    {
      path: '/:id/:name/details',
      element: <Details />
    }
  ]);
  return elements;
};

export default AppRoutes;
