import Title from "../components/Title";
import UserForm from "../components/UserForm";
import { useCallback } from "react";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import { useLogin } from "../hooks/useLogin";
import styled from "@emotion/styled";

export function Login() {
  const navigate = useNavigate();
  const { login } = useLogin();

  const handleLogin = useCallback(
    async (user: User) => {
      await login(user);

      navigate("/todo");
    },
    [login, navigate]
  );

  return (
    <Section>
      <Title>로그인</Title>

      <UserForm onSubmit={handleLogin} />

      <LinkButton to='/signup'>회원가입 할래요!</LinkButton>
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
