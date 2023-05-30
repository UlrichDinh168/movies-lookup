import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';

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
    appRoutes: (state, action) => {
      return {
        ...state,
        routesArray: action.payload
      };
    },
    pathURL: (state, action) => {
      return {
        ...state,
        path: action.payload.path,
        url: action.payload.url
      };
    }
  }
});

export const _pathURL = (path: string, url: string) => {
  store.dispatch(pathURL({ path, url }));
};

export const _appRoutes = (routes: any) => {
  store.dispatch(appRoutes({ routes }));
};

export const { appRoutes, pathURL } = RoutesSlice.actions;
export default RoutesSlice.reducer;
