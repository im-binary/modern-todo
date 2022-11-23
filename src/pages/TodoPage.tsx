/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Suspense } from 'react';
import { Button, Title, TodoForm, TodoList } from '../components';
import { useTodoList } from '../hooks/useTodoList';
import { useLogout } from '../hooks/user';

export function TodoPage() {
  const [todoList, invalidate] = useTodoList();
  const { logout } = useLogout();
  return (
    <Main>
      <div css={titleContainer}>
        <Title css={textCenter}>오늘의 할 일을 추가해보세요!</Title>
        <LogoutButton onClick={logout}>로그아웃</LogoutButton>
      </div>

      <TodoForm invalidate={invalidate} />

      <Suspense fallback={<Loading>불러오는 중...</Loading>}>
        <TodoList todoList={todoList} invalidate={invalidate} />
      </Suspense>
    </Main>
  );
}

const textCenter = css`
  text-align: center;
  flex-grow: 1;
`;

const Main = styled.main`
  padding: 20px;
`;

const Loading = styled.p`
  text-align: center;
  font-size: 1.6rem;
`;

const LogoutButton = styled(Button)`
  width: 100px;
  height: 40px;
  font-weight: bold;
  font-size: 1.5rem;
  background-color: #000;
`;

const titleContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 40px;
`;
