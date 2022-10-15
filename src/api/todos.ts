import { get, post } from "./http";

export const getTodos = async (accessToken: string) => {
  const { data } = await get("/todos", accessToken);
  return data;
};

export const createTodos = async (todo: { todo: string }, accessToken: string) => {
  const { data } = await post("/todos", todo, accessToken);
  return data;
};
