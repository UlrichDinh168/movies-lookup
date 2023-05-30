import React from 'react';
import { useRoutes } from 'react-router-dom';
import Details from './components/content/details/Details.tsx';
import Main from './components/main/Main.tsx';

const AppRoutes = () => {
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
