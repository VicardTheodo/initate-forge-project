import { all, AllEffect } from 'redux-saga/effects';

import { loginSagas } from '../auth/redux/sagas/authRootSaga';

// single entry point to start all Sagas at once
export function* rootSagas(): Generator<AllEffect<Generator>, void, unknown> {
  yield all([loginSagas()]);
}
