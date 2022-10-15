import Title from "../components/Title";
import UserForm from "../components/UserForm";
import Button from "../components/Button";
import { useCallback, useEffect, useState } from "react";
import { User } from "../models/User";
import { signIn } from "../api/signIn";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, { email, password }: User, errorMessage?: string) => {
      e.preventDefault();

      if (errorMessage != null) {
        return;
      }

      await signIn({ email, password });
      navigate("/todo");
    },
    []
  );

  return (
    <>
      <Title>Login Page</Title>

      <UserForm onSubmit={handleLogin} />

      <Button type='button'>회원가입</Button>
    </>
  );
}
