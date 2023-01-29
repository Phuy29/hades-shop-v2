import { axiosIntanse } from 'lib/axios';
import { LoginResponse, User } from 'types/user';

export const login = (data: Pick<User, 'username' | 'password'>): Promise<LoginResponse> => {
  return axiosIntanse.post('/auth/login', data);
};
