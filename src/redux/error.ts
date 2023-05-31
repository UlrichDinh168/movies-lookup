import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';

export type Errors = {
  message: '';
  statusCode: null;
};

const initialState = {
  message: '',
  statusCode: null
} as Errors;

export const ErrorSlice = createSlice({
  name: 'ErrorSlice',
  initialState,
  reducers: {
    _setError: (state, action) => {
      return {
        ...state,
        message: action.payload.message,
        statusCode: action.payload.statusCode
      };
    }
  }
});

type ErrorMessage = {
  message: string;
  statusCode: number | null;
}


export const setError = async (errorMsg: ErrorMessage) => {
  if (errorMsg) {
    const payload = {
      message: errorMsg.message,
      statusCode: errorMsg.statusCode
    };
    store.dispatch(_setError(payload));

  } else {

    store.dispatch(_setError({ payload: { message: '', statusCode: null } }));

  }
};

export default ErrorSlice.reducer;

export const { _setError } = ErrorSlice.actions;
