import { configureStore, Action } from '@reduxjs/toolkit'
import { rootReducer, RootState } from "./redux/index.js";
import thunk from "redux-thunk"
import { useDispatch } from 'react-redux'

import { ThunkAction, } from 'redux-thunk'

// const baseURL = BACKEND_BASE_URL || "http://localhost:8000";
// const baseURL = "http://localhost:8000";

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Create redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
})


