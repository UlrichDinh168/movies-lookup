import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';
import { Route } from './types/RouteType';

export type RoutesType = {
  routesArray: string[];
  path: string;
  url: string;
};

const initialState: RoutesType = {
  routesArray: [],
  path: '',
  url: ''
};

export const RoutesSlice = createSlice({
  name: 'RouteSlice',
  initialState,
  reducers: {
    _appRoutes: (state, action) => {
      return {
        ...state,
        routesArray: action.payload
      };
    },
    _pathURL: (state, action) => {
      return {
        ...state,
        path: action.payload.path,
        url: action.payload.url
      };
    }
  }
});

export const pathURL = (path: string, url: string) => {
  store.dispatch(_pathURL({ path, url }));
};

export const appRoutes = (routesArray: Route[]) => {
  store.dispatch(_appRoutes(routesArray));
};

export const { _appRoutes, _pathURL } = RoutesSlice.actions;
export default RoutesSlice.reducer;
