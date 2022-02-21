import { StrictEffect, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { loginUser, logoutUser } from '../actions';
import { loginUserSaga } from './loginUserSaga';
import { logoutUserSaga } from './logoutUserSaga';

export function* loginSagas(): Generator<StrictEffect, void, unknown> {
  yield takeEvery(getType(loginUser.request), loginUserSaga);
  yield takeEvery(logoutUser.request, logoutUserSaga);
}
