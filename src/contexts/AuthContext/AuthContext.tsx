import React, { createContext, ReactNode, useState } from 'react';
import { User } from '../../types/user';

type AuthDataType = {
  user: User | null;
  accessToken: string;
};

type AuthContextType = {
  authData: AuthDataType | null;
  setAuthData: React.Dispatch<React.SetStateAction<AuthDataType | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  authData: {
    user: null,
    accessToken: ''
  },
  setAuthData: () => null
});

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authData, setAuthData] = useState<AuthDataType | null>({ user: null, accessToken: '' });

  return <AuthContext.Provider value={{ authData, setAuthData }}>{children}</AuthContext.Provider>;
};
