import { User } from "../models/User";
import { post } from "./http";

export const join = async (user: User) => {
  const { data } = await post("/auth/signup", user);

  localStorage.setItem("access_token", data.access_token);
};
