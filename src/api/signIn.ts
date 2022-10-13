import { post } from "./http";

export const signIn = ({ email, password }: { email: string; password: string }) => {
  return post("/auth/signin", { email, password });
};
