import { useCallback } from "react";
import useFormField from "../hooks/useFormField";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const [email, onChangeEmail, emailErrorMessage] = useFormField([
    { ok: (value) => value !== "", message: "이메일을 입력해주세요" },
    { ok: (value) => value.includes("@"), message: "이메일 형식이 올바르지 않습니다" },
  ]);

  const [password, onChangePassword, passwordErrorMessage] = useFormField([
    { ok: (value) => value !== "", message: "비밀번호를 입력해주세요" },
    { ok: (value) => value.length >= 8, message: "비밀번호는 8자 이상이어야 합니다" },
  ]);

  const errorMessage = emailErrorMessage || passwordErrorMessage;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>, { email, password }: User, errorMessage?: string) => {
      e.preventDefault();

      if (errorMessage == null) {
        console.log("로그인");
        console.log(email, password);
      }
    },
    []
  );

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={(e) => handleSubmit(e, { email, password }, errorMessage)}>
        <dl>
          <dt>
            <label htmlFor='user-email'>이메일</label>
          </dt>
          <dd>
            <input type='email' id='user-email' name='user-email' onChange={onChangeEmail} />
            <p>{emailErrorMessage}</p>
          </dd>
          <dt>
            <label htmlFor='user-password'>비밀번호</label>
          </dt>
          <dd>
            <input type='password' id='user-password' name='user-password' onChange={onChangePassword} />
            <p>{passwordErrorMessage}</p>
          </dd>
        </dl>
        <button type='submit'>로그인</button>
      </form>
      <button type='button'>회원가입</button>
    </>
  );
}
