import { createSlice } from '@reduxjs/toolkit'

export type Errors = {
  message: '',
  statusCode: null
};

const initialState = {
  message: '',
  statusCode: null
} as Errors

export const ErrorSlice = createSlice({
  name: 'ErrorSlice',
  initialState,
  reducers: {
    setError: (state, action) => {
      return {
        ...state,
        message: action.payload.message,
        statusCode: action.payload.statusCode
      }
    }
  }
});

export default ErrorSlice.reducer

export const { setError } = ErrorSlice.actions