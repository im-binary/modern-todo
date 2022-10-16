import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, UserForm, LinkButton } from '../components';
import { useLogin } from '../hooks/user';
import { User } from '../models/User';

export function Login() {
  const navigate = useNavigate();
  const { login } = useLogin();

  const handleLogin = useCallback(
    async (user: User) => {
      await login(user);

      navigate('/todo');
    },
    [login, navigate]
  );

  return (
    <Section>
      <Title>로그인</Title>

      <UserForm onSubmit={handleLogin} />

      <LinkButton to="/signup">회원가입 할래요!</LinkButton>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
