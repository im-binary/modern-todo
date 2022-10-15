import Title from "../components/Title";
import UserForm from "../components/UserForm";
import Button from "../components/Button";
import { useCallback } from "react";
import { User } from "../models/User";
import { signIn } from "../api/signIn";
import { Link, useNavigate } from "react-router-dom";

export function Login({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();

  const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>, { email, password }: User) => {
    e.preventDefault();

    await signIn({ email, password });

    setIsLogin(true);

    navigate("/todo");
  }, []);

  return (
    <>
      <Title>Login Page</Title>

      <UserForm onSubmit={handleLogin} />

      <Link to='/signup'>
        <Button type='button'>회원가입</Button>
      </Link>
    </>
  );
}
