import { User } from "../models/User";
import { post } from "./http";

export const signIn = async (user: User) => {
  const { data } = await post("/auth/signin", user);

  localStorage.setItem("access_token", data.access_token);
};
