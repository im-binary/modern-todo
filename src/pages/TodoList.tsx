import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodoItem, updateTodoItem, getTodoList, deleteTodoItem } from "../api/todos";
import Button from "../components/Button";
import Todo from "../components/Todo";
import { useTokenContext } from "../contexts/TokenContext";
import useFormField from "../hooks/useFormField";

export interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export default function TodoList() {
  const navigate = useNavigate();
  const { accessToken } = useTokenContext();

  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const [content, onChangeContent, contentErrorMessage, setContent] = useFormField({
    validators: [{ ok: (value) => value !== "", message: "오늘의 할 일을 입력해주세요!" }],
  });

  const handleTodoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (contentErrorMessage != null) {
      return;
    }

    e.preventDefault();

    await createTodoItem(content, accessToken);

    navigate(0);
  };

  useEffect(() => {
    (async () => {
      const todoList = await getTodoList(accessToken);
      setTodoList(todoList);
    })();
  }, []);

  const updateTodo = async ({ id, isCompleted, todo }: Omit<TodoItem, "userId">) => {
    await updateTodoItem(id, todo, isCompleted, accessToken);

    setTodoList(todoList.map((x) => (x.id === id ? { ...x, todo, isCompleted } : x)));
  };

  const removeTodo = async (id: number) => {
    await deleteTodoItem(id, accessToken);

    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const checkComplete = async (id: number) => {
    const todoItem = todoList.find((x) => x.id === id);
    if (todoItem == null) {
      return;
    }

    await updateTodoItem(id, todoItem.todo, !todoItem.isCompleted, accessToken);

    setTodoList(todoList.map((x) => (x.id === id ? { ...x, isCompleted: !todoItem.isCompleted } : x)));
  };

  return (
    <>
      <form onSubmit={handleTodoSubmit}>
        <input type='text' onChange={onChangeContent} />
        <p>{contentErrorMessage}</p>
        <Button type='submit'>추가</Button>
      </form>
      {todoList == null ? (
        <p>아직 등록된 Todo가 없네요!!</p>
      ) : (
        <ul>
          {todoList.map((item) => (
            <Todo {...item} updateTodo={updateTodo} removeTodo={removeTodo} checkComplete={checkComplete} />
          ))}
        </ul>
      )}
    </>
  );
}
