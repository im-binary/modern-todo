import { del, get, post, put } from './http';

export const getTodoList = async (accessToken: string) => {
  const { data } = await get({
    url: '/todos',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const createTodoItem = async (todo: string, accessToken: string) => {
  const { data } = await post({
    url: '/todos',
    data: { todo },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const updateTodoItem = async (
  todoItemId: number,
  todo: string,
  isCompleted: boolean,
  accessToken: string
) => {
  const { data } = await put({
    url: `/todos/${todoItemId}`,
    data: { todo, isCompleted },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const deleteTodoItem = async (
  todoItemId: number,
  accessToken: string
) => {
  return await del({
    url: `/todos/${todoItemId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
