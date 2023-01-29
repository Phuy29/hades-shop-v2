import { axiosIntanse } from 'lib/axios';

export const logout = (): Promise<string> => {
  return axiosIntanse.post('/auth/logout');
};
