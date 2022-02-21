import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import MockDate from 'mockdate';
import jwtDecode from 'jwt-decode';

import { refreshToken } from '../../../../services/api/auth/refresh';
import { AccessToken, getAccessToken } from '../getAccessToken';
import { rootInitialState, rootReducers } from '../../../../redux/reducers';

jest.mock('jwt-decode');

const mockedDependency = jwtDecode as jest.Mock<AccessToken>;

const mockNowInSeconds = 10000;
MockDate.set(mockNowInSeconds * 1000);

// eslint-disable-next-line no-shadow
enum Tokens {
  expired = 'expiredToken',
  valid = 'validToken',
  refreshed = 'refreshedToken',
}

interface TestParams {
  startToken: string | null;
  endToken: string | null;
  refreshedAccessToken: string | null;
  returnValue: string | undefined;
}

test.each`
  startToken        | endToken            | refreshedAccessToken | returnValue         | desc
  ${null}           | ${null}             | ${Tokens.refreshed}  | ${undefined}        | ${'returns undefined when token is null'}
  ${Tokens.valid}   | ${Tokens.valid}     | ${Tokens.refreshed}  | ${Tokens.valid}     | ${'returns token when token is valid'}
  ${Tokens.expired} | ${Tokens.refreshed} | ${Tokens.refreshed}  | ${Tokens.refreshed} | ${'returns refreshed token when token is expired'}
  ${Tokens.expired} | ${null}             | ${null}              | ${undefined}        | ${'returns undefined token when refresh token returns null'}
`(
  '$desc: $startToken => $returnValue',
  ({ startToken, endToken, returnValue, refreshedAccessToken }: TestParams) => {
    const tokenExpiryTimeStamp =
      startToken === Tokens.valid ? mockNowInSeconds + 100 : mockNowInSeconds - 100;
    mockedDependency.mockReturnValue({ exp: tokenExpiryTimeStamp });

    return expectSaga(getAccessToken)
      .provide([[matchers.call.fn(refreshToken), refreshedAccessToken]])
      .withReducer(rootReducers, {
        ...rootInitialState,
        login: { token: startToken, loginError: null },
      })
      .hasFinalState({
        ...rootInitialState,
        login: { token: endToken, loginError: null },
      })
      .returns(returnValue)
      .run();
  },
);
