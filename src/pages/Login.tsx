import { useEffect, useState } from "react";

export default function Login() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [validate, setValidate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateForm = () => {
    if (userEmail === "") {
      setErrorMessage("이메일을 입력해주세요");
      return setValidate(false);
    }

    if (userPassword === "") {
      setErrorMessage("비밀번호를 입력해주세요");
      return setValidate(false);
    }

    if (!userEmail.includes("@")) {
      setErrorMessage("이메일 형식이 올바르지 않습니다");
      return setValidate(false);
    }

    if (userPassword.length < 8) {
      setErrorMessage("비밀번호는 8자 이상이어야 합니다");
      return setValidate(false);
    }

    setErrorMessage("");
    return setValidate(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate) {
      console.log(userEmail, userPassword);
    }
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit]);

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <dl>
          <dt>
            <label htmlFor='user-email'>이메일</label>
          </dt>
          <dd>
            <input type='email' id='user-email' name='user-email' onChange={handleEmailChange} />
          </dd>
          <dt>
            <label htmlFor='user-password'>비밀번호</label>
          </dt>
          <dd>
            <input type='password' id='user-password' name='user-password' onChange={handlePasswordChange} />
          </dd>
        </dl>
        <p>{errorMessage}</p>
        <button type='submit'>로그인</button>
      </form>
      <button type='button'>회원가입</button>
    </>
  );
}
