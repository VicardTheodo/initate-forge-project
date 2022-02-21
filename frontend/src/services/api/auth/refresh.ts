import { apiRoutes } from '../apiRoutes';
import { apiClient } from '../client';

export const refreshToken = async (token?: string): Promise<string> => {
  let options;
  if (token !== undefined) {
    options = {
      headers: {
        Cookie: `refreshToken=${token}`,
      },
    };
  }
  const response = await apiClient.post<{ access: string }>(apiRoutes.refresh, {}, options);

  return response.data.access;
};
