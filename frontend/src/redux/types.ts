import { LoginAction, LoginState } from '../auth/redux/reducer';

export type RootState = Readonly<{
  login: LoginState;
}>;
export type RootAction = LoginAction;
