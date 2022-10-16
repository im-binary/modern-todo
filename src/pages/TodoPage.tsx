/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Suspense } from 'react';
import { Title, TodoForm, TodoList } from '../components';
import { useTodoList } from '../hooks/useTodoList';

export function TodoPage() {
  const [todoList, invalidate] = useTodoList();

  return (
    <Main>
      <Title css={textCenter}>오늘의 할 일을 추가해보세요!</Title>

      <TodoForm invalidate={invalidate} />

      <Suspense fallback={<Loading>불러오는 중...</Loading>}>
        <TodoList todoList={todoList} invalidate={invalidate} />
      </Suspense>
    </Main>
  );
}

const textCenter = css`
  text-align: center;
`;

const Main = styled.main`
  padding: 0 20px;
`;

const Loading = styled.p`
  text-align: center;
  font-size: 1.6rem;
`;
