import { combineReducers } from "redux";
import searchResultSlice from "./itineraries";

export const rootReducer = combineReducers({
  itinerary: searchResultSlice,
});

export type RootState = ReturnType<typeof rootReducer>
