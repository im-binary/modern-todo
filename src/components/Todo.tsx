import { useState } from "react";
import useFormField from "../hooks/useFormField";
import { TodoItem } from "../pages/TodoList";
import Button from "./Button";

export default function Todo({
  id,
  isCompleted,
  todo: content,
  updateTodo,
  removeTodo,
  checkComplete,
}: {
  id: number;
  isCompleted: boolean;
  todo: string;
  updateTodo: (todo: Omit<TodoItem, "userId">) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  checkComplete: (id: number) => Promise<void>;
}) {
  const [isModify, setIsModify] = useState(false);

  const [value, onChangeContent, errorMessage] = useFormField({
    initialValue: content,
    validators: [{ ok: (value) => value !== "", message: "오늘의 할 일을 입력해주세요!" }],
  });

  const handleUpdateTodo = async () => {
    if (errorMessage != null) {
      return;
    }

    await updateTodo({ id, todo: value, isCompleted });
    setIsModify(false);
  };

  if (isModify) {
    return (
      <li key={id}>
        <input type='text' value={value} onChange={onChangeContent} />
        {errorMessage && <p>{errorMessage}</p>}
        <Button onClick={handleUpdateTodo}>등록</Button>
        <Button onClick={() => setIsModify(false)}>취소</Button>
      </li>
    );
  }

  return (
    <li key={id}>
      <label htmlFor={`todo-${id}`}>
        <input id={`todo-${id}`} type='checkbox' checked={isCompleted} onChange={() => checkComplete(id)} />
        <span>{content}</span>
      </label>
      <Button onClick={() => setIsModify(true)}>수정</Button>
      <Button onClick={() => removeTodo(id)}>삭제</Button>
    </li>
  );
}
