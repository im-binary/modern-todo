import { post } from "./http";

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await post("/auth/signin", { email, password });
  localStorage.setItem("access_token", data.access_token);
};
