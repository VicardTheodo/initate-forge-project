import jwtDecode from 'jwt-decode';
import { call, put, select } from 'redux-saga/effects';

import { refreshToken } from '../../../services/api/auth/refresh';
import { loginUser, logoutUser } from '../actions';
import { getUserToken } from '../selectors';

export interface AccessToken {
  exp: number;
}

const tokenHasExpired = (token: AccessToken): boolean => {
  // Less than 10 seconds remaining => token has expired
  const now = new Date().getTime() / 1000;

  return token.exp - now < 10;
};

export function* getAccessToken() {
  let token = getUserToken(yield select());

  if (token === null) {
    return undefined;
  }

  try {
    const parsedToken = jwtDecode<AccessToken>(token);
    if (tokenHasExpired(parsedToken)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      token = yield call(refreshToken);
      if (typeof token === 'string') {
        yield put(loginUser.success({ token }));
      } else {
        throw new Error('No refreshed token');
      }
    }
  } catch (_) {
    yield put(logoutUser.success());
  }

  return token ?? undefined;
}
