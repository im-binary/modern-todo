import styled from "@emotion/styled";
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
    <Form onSubmit={handleSubmit}>
      <InputLabel htmlFor='user-email'>
        <InputName>이메일</InputName>
        <Input type='email' id='user-email' name='user-email' onChange={onChangeEmail} autoFocus />
        <InputErrorMessage>{emailErrorMessage}</InputErrorMessage>
      </InputLabel>

      <InputLabel htmlFor='user-password'>
        <InputName>비밀번호</InputName>
        <Input type='password' id='user-password' name='user-password' onChange={onChangePassword} />
        <InputErrorMessage>{passwordErrorMessage}</InputErrorMessage>
      </InputLabel>

      <SubmitButton type='submit' disabled={errorMessage != null}>
        제출
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  padding: 20px;
  width: 300px;
`;

const Input = styled.input`
  border-width: 0px 0px 1px 0px;
  width: 100%;
  height: 30px;
  padding-left: 8px;
`;

const InputLabel = styled.label`
  display: block;
`;

const InputName = styled.p`
  font-weight: bold;
  font-size: 1.6rem;
`;

const InputErrorMessage = styled.p`
  text-indent: 1rem;
  color: #f53b3b;
  height: 16px;
  margin-bottom: 0;
  font-size: 1.3rem;
`;

const SubmitButton = styled(Button)`
  padding: 16px;
  margin-top: 30px;

  &:disabled {
    background-color: #c1c1c199;
    cursor: not-allowed;
    font-weight: 500;
  }
`;
