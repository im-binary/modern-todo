import { post } from "./http";

export const join = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await post("/auth/signup", { email, password });

  localStorage.setItem("access_token", data.access_token);
};
