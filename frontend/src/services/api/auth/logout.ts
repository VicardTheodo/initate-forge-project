import { apiRoutes } from '../apiRoutes';
import { apiClient } from '../client';

export const logout = async (token: string): Promise<string> => {
  const response = await apiClient.post<string>(apiRoutes.logout, undefined, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
