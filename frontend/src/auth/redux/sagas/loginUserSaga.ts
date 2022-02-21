import jwtDecode from 'jwt-decode';
import Router from 'next/router';
import { call, put, StrictEffect } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

import { Scope } from '@sentry/browser';
import { Sentry } from '../../../services/sentry';
import { login } from '../../../services/api/auth/login';
import { loginUser } from '../actions';

export function* loginUserSaga(
  action: ActionType<typeof loginUser.request>,
): Generator<StrictEffect | Promise<boolean>, void, string | undefined> {
  try {
    const token = yield call(login, action.payload);

    if (token === undefined) {
      throw new Error('No token in login response body');
    } // intl?!

    yield put(loginUser.success({ token }));

    /* istanbul ignore next */
    Sentry.configureScope((scope: Scope) => {
      scope.setUser({
        email: action.payload.email,
        ...jwtDecode(token),
      });
    });

    yield Router.push('/');
  } catch (error: unknown) {
    let errorMessage = `Error: ${String(error)}`;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(loginUser.failure({ errorMessage }));
  }
}
