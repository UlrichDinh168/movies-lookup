import { combineReducers } from "redux";
import movieReducer from "./movieSlice";
import routeReducer from "./routesSlice";

export const rootReducer = combineReducers({
  movie: movieReducer,
  route: routeReducer,
});

export type RootState = ReturnType<typeof rootReducer>
