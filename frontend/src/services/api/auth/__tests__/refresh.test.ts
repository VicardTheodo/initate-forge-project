import mockAxios from 'jest-mock-axios';

import { apiRoutes } from '../../apiRoutes';
import { refreshToken } from '../refresh';

afterEach(() => {
  mockAxios.reset();
});

describe('refreshToken api call', () => {
  test('returns new access token without refresh token passed in as parameter', async () => {
    const refreshTokenReponseToken = 'test token';
    const token = refreshToken();
    expect(mockAxios.post).toHaveBeenCalledWith(apiRoutes.refresh, {}, undefined);
    mockAxios.mockResponse({ data: { access: refreshTokenReponseToken } });
    expect(await token).toBe(refreshTokenReponseToken);
  });
  test('returns new access token with refresh token passed in as parameter', async () => {
    const refreshTokenReponseToken = 'test token';
    const refreshTokenParameter = 'refreshTokenParameter';
    const token = refreshToken(refreshTokenParameter);
    expect(mockAxios.post).toHaveBeenCalledWith(
      apiRoutes.refresh,
      {},
      { headers: { Cookie: `refreshToken=${refreshTokenParameter}` } },
    );
    mockAxios.mockResponse({ data: { access: refreshTokenReponseToken } });
    expect(await token).toBe(refreshTokenReponseToken);
  });
});
