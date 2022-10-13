import useFormField from "../hooks/useFormField";

export default function Login() {
  const {
    value: userEmail,
    onChange: onChangeUserEmail,
    errorMessage: emailErrorMessage,
  } = useFormField([
    { valid: (value) => value !== "", message: "이메일을 입력해주세요" },
    { valid: (value) => value.includes("@"), message: "이메일 형식이 올바르지 않습니다" },
  ]);

  const {
    value: userPassword,
    onChange: onChangeUserPassword,
    errorMessage: passwordErrorMessage,
  } = useFormField([
    { valid: (value) => value !== "", message: "비밀번호를 입력해주세요" },
    { valid: (value) => value.length >= 8, message: "비밀번호는 8자 이상이어야 합니다" },
  ]);

  console.log(emailErrorMessage, passwordErrorMessage);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailErrorMessage == null && passwordErrorMessage == null) {
      console.log("로그인");
      console.log(userEmail, userPassword);
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <dl>
          <dt>
            <label htmlFor='user-email'>이메일</label>
          </dt>
          <dd>
            <input type='email' id='user-email' name='user-email' onChange={onChangeUserEmail} />
            <p>{emailErrorMessage}</p>
          </dd>
          <dt>
            <label htmlFor='user-password'>비밀번호</label>
          </dt>
          <dd>
            <input type='password' id='user-password' name='user-password' onChange={onChangeUserPassword} />
            <p>{passwordErrorMessage}</p>
          </dd>
        </dl>
        <button type='submit'>로그인</button>
      </form>
      <button type='button'>회원가입</button>
    </>
  );
}
