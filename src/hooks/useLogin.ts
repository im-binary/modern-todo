import { signIn } from "../api/signIn";
import { useTokenContext } from "../contexts/TokenContext";
import { User } from "../models/User";

export function useLogin() {
  const { setAccessToken } = useTokenContext();

  return {
    login: async (user: User) => {
      const { access_token } = await signIn(user);

      localStorage.setItem("access_token", access_token);

      setAccessToken(access_token);
    },
  } as const;
}
