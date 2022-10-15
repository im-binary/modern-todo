import Title from "../components/Title";
import UserForm from "../components/UserForm";
import { useCallback } from "react";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import { useLogin } from "../hooks/useLogin";

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
    <>
      <Title>Login Page</Title>

      <UserForm onSubmit={handleLogin} />

      <LinkButton to='/signup'>회원가입하러 가기</LinkButton>
    </>
  );
}
