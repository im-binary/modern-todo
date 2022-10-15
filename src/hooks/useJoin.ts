import { join } from "../api/join";
import { useTokenContext } from "../contexts/TokenContext";
import { User } from "../models/User";

export function useJoin() {
  const { setAccessToken } = useTokenContext();

  return {
    join: async (user: User) => {
      const { access_token } = await join(user);

      localStorage.setItem("access_token", access_token);

      setAccessToken(access_token);
    },
  } as const;
}
