import { RootState } from '../../redux/types';

export const getUserToken = (store: RootState): string | null => store.login.token;
export const getLoginError = (store: RootState): string | null => store.login.loginError;
export const selectIsUserLoggedIn = (store: RootState): boolean => store.login.token !== null;
