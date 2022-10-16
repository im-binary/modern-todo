import { getTodoList } from '../api/todos';
import { useTokenContext } from '../contexts/TokenContext';
import { TodoItem } from '../models/TodoItem';
import { useFetch } from './useFetch';

export function useTodoList() {
  const { accessToken } = useTokenContext();
  const { data: todoList, invalidate } = useFetch<TodoItem[]>(
    ['getTodoList'],
    () => getTodoList(accessToken)
  );

  return [todoList, invalidate] as const;
}
