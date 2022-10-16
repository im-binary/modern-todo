import { createContext, ReactNode, useContext, useState } from 'react';

const tokenStorage = {
  get: () => {
    return localStorage.getItem('access_token') || '';
  },
  set: (accessToken: string) => {
    localStorage.setItem('access_token', accessToken);
  },
};

interface TokenContextType {
  isLogin: boolean;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const TokenContext = createContext<TokenContextType>({
  isLogin: false,
  accessToken: '',
  setAccessToken: () => undefined,
});

export const TokenContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>(tokenStorage.get());

  const value = {
    isLogin: accessToken !== '',
    accessToken,
    setAccessToken: (accessToken: string) => {
      tokenStorage.set(accessToken);

      setAccessToken(accessToken);
    },
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  return useContext(TokenContext);
};
