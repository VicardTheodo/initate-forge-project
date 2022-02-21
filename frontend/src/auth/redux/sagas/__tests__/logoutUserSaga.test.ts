import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';

import { logout } from '../../../../services/api/auth/logout';
import { logoutUser } from '../../actions';
import { logoutUserSaga } from '../logoutUserSaga';
import { getAccessToken } from '../getAccessToken';

test('logoutUserSaga handles thrown errors of type Error', () => {
  const errorMessage = 'error';
  const logoutRequestAction = logoutUser.request();
  const error = new Error(errorMessage);

  return expectSaga(logoutUserSaga, logoutRequestAction)
    .provide([
      [matchers.call.fn(logout), throwError(error)],
      [matchers.call.fn(getAccessToken), 'token'],
    ])
    .put(logoutUser.failure({ errorMessage }))
    .run();
});

test('logoutUserSaga handles thrown errors of type !== Error', () => {
  const errorMessage = 'error';
  const logoutRequestAction = logoutUser.request();

  return expectSaga(logoutUserSaga, logoutRequestAction)
    .provide([
      [matchers.call.fn(logout), throwError(('error' as unknown) as Error)],
      [matchers.call.fn(getAccessToken), 'token'],
    ])
    .put(logoutUser.failure({ errorMessage: `Error: ${errorMessage}` }))
    .run();
});

test('logoutUserSaga dispatches logout success action if there is no token', () => {
  const logoutRequestAction = logoutUser.request();

  return expectSaga(logoutUserSaga, logoutRequestAction)
    .provide([[matchers.call.fn(getAccessToken), undefined]])
    .put(logoutUser.success())
    .run();
});
