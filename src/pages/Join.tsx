/** @jsxImportSource @emotion/react */
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useJoin } from "../hooks/useJoin";
import LinkButton from "../components/LinkButton";
import Title from "../components/Title";
import UserForm from "../components/UserForm";
import { User } from "../models/User";
import { useLogin } from "../hooks/useLogin";
import { css } from "@emotion/react";

export function Join() {
  const navigate = useNavigate();
  const { join } = useJoin();
  const { login } = useLogin();

  const handleJoin = useCallback(
    async (user: User) => {
      await join(user);
      await login(user);

      navigate("/todo");
    },
    [join, login, navigate]
  );

  return (
    <section css={joinContainer}>
      <Title>회원가입</Title>

      <UserForm onSubmit={handleJoin} />

      <LinkButton to='/'>로그인 할래요!</LinkButton>
    </section>
  );
}

const joinContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
