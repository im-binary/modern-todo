import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useJoin } from "../hooks/useJoin";
import LinkButton from "../components/LinkButton";
import Title from "../components/Title";
import UserForm from "../components/UserForm";
import { User } from "../models/User";
import { useLogin } from "../hooks/useLogin";

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
    <>
      <Title>singup Page</Title>
      <UserForm onSubmit={handleJoin} />
      <LinkButton to='/'>로그인하러 가기</LinkButton>
    </>
  );
}
