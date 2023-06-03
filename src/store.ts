import {
  configureStore,
  Action,
  ThunkMiddleware
} from '@reduxjs/toolkit';
import { rootReducer, RootState } from './redux/index.js';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Middleware configuration
const middleware: ThunkMiddleware<RootState, Action>[] = [thunk];

if (import.meta.env.DEV) {
  middleware.push(logger);
}

// Create redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: import.meta.env.DEV
});
