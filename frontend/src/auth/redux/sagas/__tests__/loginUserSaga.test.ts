import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';

import { login } from '../../../../services/api/auth/login';
import { loginUser } from '../../actions';
import { loginUserSaga } from '../loginUserSaga';

test('loginUserSaga handles thrown errors of type !== Error', () => {
  const errorMessage = 'error';
  const loginRequestAction = loginUser.request({ email: 'email', password: 'password' });

  return expectSaga(loginUserSaga, loginRequestAction)
    .provide([[matchers.call.fn(login), throwError(('error' as unknown) as Error)]])
    .put(loginUser.failure({ errorMessage: `Error: ${errorMessage}` }))
    .run();
});
