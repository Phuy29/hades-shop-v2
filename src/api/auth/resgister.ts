import { axiosIntanse } from 'lib/axios';
import { useMutation } from 'react-query';
import { User } from 'types/user';

const register = (data: Pick<User, 'username' | 'email' | 'password'>): Promise<User> => {
  return axiosIntanse.post('/auth/register', data);
};

export const useRegister = (data: Pick<User, 'username' | 'email' | 'password'>) => {
  return useMutation({
    mutationFn: () => register(data)
  });
};
