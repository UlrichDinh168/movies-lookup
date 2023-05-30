import { combineReducers } from 'redux';
import movieReducer from './movie';
import routeReducer from './route';
import errorReducer from './error';

export const rootReducer = combineReducers({
  movie: movieReducer,
  route: routeReducer,
  error: errorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
