import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

export const useAuth = () => {
  const { authData, setAuthData } = useContext(AuthContext);

  return { authData, setAuthData };
};
