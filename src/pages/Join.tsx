import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { join } from "../api/join";
import { signIn } from "../api/signIn";
import Title from "../components/Title";
import UserForm from "../components/UserForm";
import { User } from "../models/User";

export function Join() {
  const navigate = useNavigate();

  const handleJoin = useCallback(async (e: React.FormEvent<HTMLFormElement>, { email, password }: User) => {
    e.preventDefault();

    await join({ email, password });
    await signIn({ email, password });
    navigate("/todo");
  }, []);

  return (
    <>
      <Title>singup Page</Title>
      <UserForm onSubmit={handleJoin} />
    </>
  );
}
