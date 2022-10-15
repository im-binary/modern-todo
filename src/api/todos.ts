import { get, post } from "./http";

export const getTodoList = async (accessToken: string) => {
  const { data } = await get({
    url: "/todos",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const createTodoItem = async (todo: string, accessToken: string) => {
  const { data } = await post({
    url: "/todos",
    data: { todo },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
