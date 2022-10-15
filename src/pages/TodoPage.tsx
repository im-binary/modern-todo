import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { createTodoItem } from "../api/todos";
import Button from "../components/Button";
import TodoList from "../components/TodoList";
import { useTokenContext } from "../contexts/TokenContext";
import useFormField from "../hooks/useFormField";

export interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export function TodoPage() {
  const navigate = useNavigate();
  const { accessToken } = useTokenContext();

  const [content, onChangeContent, contentErrorMessage] = useFormField({
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

  return (
    <>
      <form onSubmit={handleTodoSubmit}>
        <input type='text' onChange={onChangeContent} />
        <p>{contentErrorMessage}</p>
        <Button type='submit'>추가</Button>
      </form>
      <Suspense fallback={<p>불러오는 중...</p>}>
        <TodoList />
      </Suspense>
    </>
  );
}
