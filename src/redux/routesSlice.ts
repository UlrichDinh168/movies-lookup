import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
      }
    },
    pathUrl: (state, action) => {
      return {
        ...state,
        path: action.payload.path,
        url: action.payload.url
      }
    },
  }
});

export default RoutesSlice.reducer