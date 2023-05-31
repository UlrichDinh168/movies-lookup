import React, { useEffect, useRef } from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/Errors/ErrorBoundary';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Details from './components/content/details/Details';
import AppRoutes from './routes';
import { appRoutes } from './redux/route';
import { Route } from './redux/types/RouteType';

const App = () => {
  const effectRan = useRef(false);

  const routesArray: Route[] = [
    {
      id: 1,
      path: '/',
      component: Main
    },
    {
      id: 2,
      path: '/:id/:name/details',
      component: Details
    }
  ];

  useEffect(() => {
    if (effectRan.current === false) {
      appRoutes(routesArray);
    }
    return () => {
      effectRan.current = true;
    };
  }, [routesArray, appRoutes]);

  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Error page</div>}>
        <Header />
      </ErrorBoundary>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
