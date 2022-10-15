import { createContext, ReactNode, useContext, useState } from "react";

interface TokenContextType {
  isLogin: boolean;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

const TokenContext = createContext<TokenContextType>({
  isLogin: false,
  accessToken: "",
  setAccessToken: () => {},
});

export const TokenContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>(localStorage.getItem("access_token") || "");

  const value = {
    isLogin: accessToken !== "",
    accessToken,
    setAccessToken,
  };

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

export const useTokenContext = () => {
  return useContext(TokenContext);
};
