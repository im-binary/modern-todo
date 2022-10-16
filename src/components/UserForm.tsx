/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useFormField from "../hooks/useFormField";
import { User } from "../models/User";
import Button from "./Button";

export default function UserForm({ onSubmit }: { onSubmit: (user: User) => void }) {
  const [email, onChangeEmail, emailErrorMessage] = useFormField({
    validators: [
      { ok: (value) => value !== "", message: "이메일을 입력해주세요" },
      { ok: (value) => value.includes("@"), message: "이메일 형식이 올바르지 않습니다" },
    ],
  });

  const [password, onChangePassword, passwordErrorMessage] = useFormField({
    validators: [
      { ok: (value) => value !== "", message: "비밀번호를 입력해주세요" },
      { ok: (value) => value.length >= 8, message: "비밀번호는 8자 이상이어야 합니다" },
    ],
  });

  const errorMessage = emailErrorMessage || passwordErrorMessage;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorMessage != null) {
      return;
    }

    return onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} css={userFormContainer}>
      <label htmlFor='user-email'>
        <p>이메일</p>
        <input type='email' id='user-email' name='user-email' onChange={onChangeEmail} autoFocus />
        <p>{emailErrorMessage}</p>
      </label>

      <label htmlFor='user-password'>
        <p>비밀번호</p>
        <input type='password' id='user-password' name='user-password' onChange={onChangePassword} />
        <p>{passwordErrorMessage}</p>
      </label>

      <Button type='submit' disabled={errorMessage != null} className='submit-button'>
        제출
      </Button>
    </form>
  );
}

const userFormContainer = css`
  padding: 20px;
  width: 300px;

  label {
    display: block;

    p:first-of-type {
      font-weight: bold;
      font-size: 1.6rem;
    }

    input {
      border-width: 0px 0px 1px 0px;
      width: 100%;
      height: 30px;
      padding-left: 8px;
    }

    p:nth-of-type(2) {
      text-indent: 1rem;
      color: #f53b3b;
      height: 16px;
      margin-bottom: 0;
      font-size: 1.3rem;
    }
  }

  button.submit-button {
    padding: 16px;
    margin-top: 30px;
    /* border: 0;
    border-radius: 20px;
    background-color: #dc602a;
    color: #fff;
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: 1.2px; */
  }

  button:disabled.submit-button {
    background-color: #c1c1c199;
    cursor: not-allowed;
    font-weight: 500;
  }
`;
