import Router from 'next/router';
import { call, put, StrictEffect } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

import { logout } from '../../../services/api/auth/logout';
import { routes } from '../../../services/routes';
import { logoutUser } from '../actions';
import { getAccessToken } from './getAccessToken';

export function* logoutUserSaga(
  action: ActionType<typeof logoutUser.request>,
): Generator<StrictEffect | Promise<boolean>, void, string | undefined> {
  const token = yield call(getAccessToken);
  try {
    if (typeof token === 'string') {
      yield call(logout, token);
    }
    yield put(logoutUser.success());
    yield Router.push(routes.LOGIN);
  } catch (error) {
    let errorMessage = `Error: ${String(error)}`;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(logoutUser.failure({ errorMessage }));
  }
}
