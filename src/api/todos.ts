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
  await post({
    url: '/todos',
    data: { todo },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateTodoItem = async (
  todoItemId: number,
  todo: string,
  isCompleted: boolean,
  accessToken: string
) => {
  await put({
    url: `/todos/${todoItemId}`,
    data: { todo, isCompleted },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteTodoItem = async (
  todoItemId: number,
  accessToken: string
) => {
  await del({
    url: `/todos/${todoItemId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
