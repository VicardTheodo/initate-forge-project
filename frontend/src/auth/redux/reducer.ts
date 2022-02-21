import { ActionType, getType } from 'typesafe-actions';
import { AnyAction } from 'redux';

import { loginUser, logoutUser } from './actions';
import { hydrate } from '../../redux/actions';

export type LoginAction = ActionType<typeof loginUser | typeof logoutUser | typeof hydrate>;

export type LoginState = Readonly<{
  token: string | null;
  loginError: string | null;
}>;

export const initialState: LoginState = { token: null, loginError: null };

export const authReducer = (state: LoginState = initialState, action: AnyAction): LoginState => {
  const typedAction = action as LoginAction;
  switch (typedAction.type) {
    case getType(loginUser.request):
      return {
        ...state,
        loginError: null,
      };
    case getType(loginUser.success):
      return {
        ...state,
        token: typedAction.payload.token,
        loginError: null,
      };
    case getType(loginUser.failure):
      return {
        ...state,
        loginError: typedAction.payload.errorMessage,
      };
    case getType(logoutUser.success):
      return initialState;
    case getType(hydrate):
      return { ...state, ...typedAction.payload.login };
    default:
      return state;
  }
};
