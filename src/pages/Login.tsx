import Title from "../components/Title";
import UserForm from "../components/UserForm";
import { useCallback } from "react";
import { User } from "../models/User";
import { signIn } from "../api/signIn";
import { useNavigate } from "react-router-dom";
import LinkButton from "../components/LinkButton";

export function Login({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();

  const handleLogin = useCallback(async (user: User) => {
    await signIn(user);

    setIsLogin(true);

    navigate("/todo");
  }, []);

  return (
    <>
      <Title>Login Page</Title>

      <UserForm onSubmit={handleLogin} />

      <LinkButton to='/signup'>회원가입하러 가기</LinkButton>
    </>
  );
}
