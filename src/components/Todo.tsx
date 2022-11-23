import styled from '@emotion/styled';
import { useState } from 'react';
import { useFormField } from '../hooks/useFormField';
import { TodoItem } from '../models/TodoItem';
import { Button } from './Button';

export function Todo({
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
  updateTodo: (todo: Omit<TodoItem, 'userId'>) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  checkComplete: (id: number) => Promise<void>;
}) {
  const [isModify, setIsModify] = useState(false);

  const { value, onChange, errorMessage, setValue } = useFormField({
    initialValue: content,
    validators: [
      { ok: (value) => value !== '', message: '빈 칸으로 수정할 수는 없어요' },
    ],
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
        <input type="text" value={value} onChange={onChange} />
        <TodoButton onClick={handleUpdateTodo}>등록</TodoButton>
        <TodoButton onClick={() => setIsModify(false)}>취소</TodoButton>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </>
    );
  }

  return (
    <>
      <Label htmlFor={`todo-${id}`} isCompleted={isCompleted}>
        <input
          id={`todo-${id}`}
          type="checkbox"
          checked={isCompleted}
          onChange={() => checkComplete(id)}
        />
        <span>{content}</span>
      </Label>
      <TodoButton
        onClick={() => {
          setIsModify(true);
          setValue(content);
        }}
      >
        수정
      </TodoButton>
      <TodoButton onClick={() => removeTodo(id)}>삭제</TodoButton>
    </>
  );
}

const Label = styled.label`
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 6px;
  align-items: center;
  justify-content: center;

  span {
    text-decoration: ${({ isCompleted }: { isCompleted: boolean }) =>
      isCompleted ? 'line-through' : 'unset'};
    word-break: break-all;
    cursor: pointer;
  }

  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const TodoButton = styled(Button)`
  padding: 4px;
  border-radius: 10px;
`;

const ErrorMessage = styled.p`
  height: 16px;
  margin: 0;
  font-size: 1.3rem;
  color: #f53b3b;
  text-align: center;
`;
