import useFormField from "../hooks/useFormField";
import { User } from "../models/User";
import Button from "./Button";

export default function UserForm({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, user: User, errorMessage?: string) => void;
}) {
  const [email, onChangeEmail, emailErrorMessage] = useFormField([
    { ok: (value) => value !== "", message: "이메일을 입력해주세요" },
    { ok: (value) => value.includes("@"), message: "이메일 형식이 올바르지 않습니다" },
  ]);

  const [password, onChangePassword, passwordErrorMessage] = useFormField([
    { ok: (value) => value !== "", message: "비밀번호를 입력해주세요" },
    { ok: (value) => value.length >= 8, message: "비밀번호는 8자 이상이어야 합니다" },
  ]);

  const errorMessage = emailErrorMessage || passwordErrorMessage;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorMessage != null) {
      return;
    }

    return onSubmit(e, { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='user-email'>
        이메일
        <input type='email' id='user-email' name='user-email' onChange={onChangeEmail} />
        <p>{emailErrorMessage}</p>
      </label>

      <label htmlFor='user-password'>
        비밀번호
        <input type='password' id='user-password' name='user-password' onChange={onChangePassword} />
        <p>{passwordErrorMessage}</p>
      </label>

      <Button type='submit'>제출</Button>
    </form>
  );
}
