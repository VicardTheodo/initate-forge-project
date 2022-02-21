import { createAsyncAction } from 'typesafe-actions';

export const loginUser = createAsyncAction(
  'Login/USER_LOGIN_REQUEST',
  'Login/USER_LOGIN_SUCCESS',
  'Login/USER_LOGIN_FAILURE',
)<
  {
    email: string;
    password: string;
  },
  {
    token: string;
  },
  {
    errorMessage: string;
  }
>();

export const logoutUser = createAsyncAction(
  'Logout/USER_LOGOUT_REQUEST',
  'Logout/USER_LOGOUT_SUCCESS',
  'Logout/USER_LOGOUT_FAILURE',
)<
  undefined,
  undefined,
  {
    errorMessage: string;
  }
>();
