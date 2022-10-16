/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import useFormField from "../hooks/useFormField";
import { TodoItem } from "../pages/TodoPage";
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
    validators: [{ ok: (value) => value !== "", message: "빈 칸으로 수정할 수는 없어요" }],
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
      <>
        <input type='text' value={value} onChange={onChangeContent} />
        <Button
          onClick={handleUpdateTodo}
          css={css`
            padding: 4px;
            border-radius: 10px;
          `}
        >
          등록
        </Button>
        <Button
          onClick={() => setIsModify(false)}
          css={css`
            padding: 4px;
            border-radius: 10px;
          `}
        >
          취소
        </Button>
        <p
          css={css`
            height: 16px;
            margin: 0;
            font-size: 1.3rem;
            color: #f53b3b;
            text-align: center;
          `}
        >
          {errorMessage}
        </p>
      </>
    );
  }

  return (
    <>
      <label htmlFor={`todo-${id}`} css={todoContentContainer}>
        <input id={`todo-${id}`} type='checkbox' checked={isCompleted} onChange={() => checkComplete(id)} />
        <span>{content}</span>
      </label>
      <Button
        onClick={() => setIsModify(true)}
        css={css`
          padding: 4px;
          border-radius: 10px;
        `}
      >
        수정
      </Button>
      <Button
        onClick={() => removeTodo(id)}
        css={css`
          padding: 4px;
          border-radius: 10px;
        `}
      >
        삭제
      </Button>
    </>
  );
}

const todoContentContainer = css`
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 6px;
  align-items: center;
  justify-content: center;

  span {
    word-break: break-all;
    cursor: pointer;
  }

  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
