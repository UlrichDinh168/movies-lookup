import React, { useEffect } from 'react';
import axios from 'axios';
import { store } from "./store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/Errors/ErrorBoundary.js';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Details from './components/Details.js';

const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000,
});

const App = () => {

  const routesArray = [
    {
      id: 1,
      path: '/',
      component: <Main />
    },
    {
      id: 2,
      path: '/:id/:name/details',
      component: <Details />
    }
  ];
  useEffect(() => {
    const name = async () => {
      const data = await instance.get('/asset_platforms')
      console.log(data, 'data');

    }
    name()
  }, [])


  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <Provider store={store}>
        <div className="">
          TESTTTT
        </div>
      </Provider>
    </BrowserRouter>


  );
}

export default App;
