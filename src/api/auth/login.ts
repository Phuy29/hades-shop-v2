import { axiosIntanse } from 'lib/axios';
import { useMutation } from 'react-query';
import { LoginResponse, User } from 'types/user';

const login = (data: Pick<User, 'username' | 'password'>): Promise<LoginResponse> => {
  return axiosIntanse.post('/auth/login', data);
};

export const useLogin = (data: Pick<User, 'username' | 'password'>) => {
  return useMutation({
    mutationFn: () => login(data)
  });
};
