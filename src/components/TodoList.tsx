/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { deleteTodoItem, updateTodoItem } from '../api/todos';
import { useTokenContext } from '../contexts/TokenContext';
import { TodoItem } from '../models/TodoItem';
import { Todo } from './Todo';

export function TodoList({
  todoList,
  invalidate,
}: {
  todoList: TodoItem[];
  invalidate: () => void;
}) {
  const { accessToken } = useTokenContext();

  const updateTodo = async ({
    id,
    isCompleted,
    todo,
  }: Omit<TodoItem, 'userId'>) => {
    await updateTodoItem(id, todo, isCompleted, accessToken);
    invalidate();
  };

  const removeTodo = async (id: number) => {
    await deleteTodoItem(id, accessToken);
    invalidate();
  };

  const checkComplete = async (id: number) => {
    const todoItem = todoList.find((x) => x.id === id);
    if (todoItem == null) {
      return;
    }

    await updateTodoItem(id, todoItem.todo, !todoItem.isCompleted, accessToken);
    invalidate();
  };

  if (todoList.length === 0) {
    return (
      <p
        css={css`
          text-align: center;
          font-size: 1.6rem;
          font-weight: bold;
        `}
      >
        아직 등록된 할일이 없습니다.
      </p>
    );
  }

  return (
    <List>
      {todoList.map((item) => (
        <ListItem key={item.id} isCompleted={item.isCompleted}>
          <Todo
            {...item}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
            checkComplete={checkComplete}
          />
        </ListItem>
      ))}
    </List>
  );
}

const List = styled.ul`
  li + li {
    margin-top: 20px;
  }
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 50px 50px;
  align-items: center;
  gap: 6px;
  border: 1px solid;
  border-radius: 20px;
  padding: 20px 10px;
  font-size: 1.6rem;
  background-color: ${({ isCompleted }: { isCompleted: boolean }) =>
    isCompleted ? '#c1c1c199' : '#fff'};
  border-color: ${({ isCompleted }: { isCompleted: boolean }) =>
    isCompleted ? '#c1c1c199' : '#dc602a'};
`;
