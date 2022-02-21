import { apiRoutes } from '../apiRoutes';
import { apiClient } from '../client';

interface LoginData {
  email: string;
  password: string;
}
export const login = async (data: LoginData): Promise<string | undefined> => {
  const result = await apiClient.post<{ token?: string; access?: string }>(apiRoutes.login, data);
  const token: string | undefined = result.data.token ?? result.data.access;

  return token;
};
