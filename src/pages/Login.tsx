import Title from "../components/Title";
import UserForm from "../components/UserForm";
import Button from "../components/Button";
import { useCallback, useEffect, useState } from "react";
import { User } from "../models/User";
import { signIn } from "../api/signIn";
import { useNavigate } from "react-router-dom";
import useErrorBoundary from "../hooks/useErrorBoundary";

export default function Login() {
  const navigate = useNavigate();
  const [, setError] = useErrorBoundary();
  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, { email, password }: User, errorMessage?: string) => {
      e.preventDefault();

      if (errorMessage != null) {
        return;
      }

      try {
        await signIn({ email, password });
        navigate("/todo");
      } catch (err: any) {
        // alert(err.message);
        setError(err);
      }
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
