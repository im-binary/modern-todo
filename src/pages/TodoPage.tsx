/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { createTodoItem } from "../api/todos";
import Button from "../components/Button";
import Title from "../components/Title";
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
  console.log(contentErrorMessage);

  return (
    <main css={todoPageContainer}>
      <Title>오늘의 할 일을 추가해보세요!</Title>
      <form onSubmit={handleTodoSubmit}>
        <input type='text' onChange={onChangeContent} />
        <Button type='submit' className='todo-submit-button' disabled={contentErrorMessage != null}>
          추가
        </Button>
        <p
          css={css`
            color: red;
          `}
        >
          {contentErrorMessage}
        </p>
      </form>
      <Suspense
        fallback={
          <p
            css={css`
              text-align: center;
              font-size: 1.6rem;
            `}
          >
            불러오는 중...
          </p>
        }
      >
        <TodoList />
      </Suspense>
    </main>
  );
}

const todoPageContainer = css`
  padding: 0 20px;

  h1 {
    text-align: center;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 60px;
    gap: 0px 10px;

    input {
      padding-left: 8px;
    }

    p {
      height: 16px;
      font-size: 1.3rem;
      text-align: center;
    }
    button.todo-submit-button {
      padding: 8px 0;
      border-radius: 12px;
    }

    button:disabled.todo-submit-button {
      background-color: #c1c1c199;
      cursor: not-allowed;
      font-weight: 500;
    }
  }
`;
