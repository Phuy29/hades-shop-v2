import { axiosIntanse } from 'lib/axios';
import { User } from 'types/user';

export const register = (data: Pick<User, 'username' | 'email' | 'password'>): Promise<User> => {
  return axiosIntanse.post('/auth/register', data);
};
