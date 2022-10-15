import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodoItem, getTodoList } from "../api/todos";
import Button from "../components/Button";
import { useTokenContext } from "../contexts/TokenContext";

interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
export default function Todo() {
  const navigate = useNavigate();
  const { isLogin, accessToken } = useTokenContext();
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [content, setContent] = useState("");

  const postTodo = async () => {
    await createTodoItem(content, accessToken);
  };

  const handleTodoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postTodo();
    navigate(0);
  };

  useEffect(() => {
    (async () => {
      const todoList = await getTodoList(accessToken);
      setTodoList(todoList);
    })();
  }, []);

  return (
    <>
      <h1>isLogin: {String(isLogin)}</h1>
      <form onSubmit={handleTodoSubmit}>
        <input type='text' onChange={(e) => setContent(e.target.value)} />
        <Button type='submit'>추가</Button>
      </form>
      {todoList == null ? (
        <p>아직 등록된 Todo가 없네요!!</p>
      ) : (
        <ul>
          {todoList.map((item) => (
            <li key={item.id}>
              <label htmlFor={`todo-${item.id}`}>
                <p>{item.todo}</p>
                <input id={`todo-${item.id}`} type='checkbox' />
              </label>
              <Button>삭제</Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
