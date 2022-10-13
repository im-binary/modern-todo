import Button from "../components/Button";
import Title from "../components/Title";
import UserForm from "../components/UserForm";

export default function Login() {
  return (
    <>
      <Title>Login Page</Title>

      <UserForm />

      <Button type='button'>회원가입</Button>
    </>
  );
}
