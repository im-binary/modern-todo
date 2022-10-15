import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { join } from "../api/join";
import { signIn } from "../api/signIn";
import LinkButton from "../components/LinkButton";
import Title from "../components/Title";
import UserForm from "../components/UserForm";
import { User } from "../models/User";

export function Join({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();

  const handleJoin = useCallback(async (user: User) => {
    await join(user);
    await signIn(user);

    setIsLogin(true);

    navigate("/todo");
  }, []);

  return (
    <>
      <Title>singup Page</Title>
      <UserForm onSubmit={handleJoin} />
      <LinkButton to='/login'>로그인하러 가기</LinkButton>
    </>
  );
}
