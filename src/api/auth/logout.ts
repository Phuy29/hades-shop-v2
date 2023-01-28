import { axiosIntanse } from 'lib/axios';
import { useMutation } from 'react-query';

const logout = (): Promise<string> => {
  return axiosIntanse.post('/auth/logout');
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout()
  });
};
