import { useTokenContext } from "../contexts/TokenContext";

export default function Todo() {
  const { isLogin } = useTokenContext();

  return <h1>isLogin: {String(isLogin)}</h1>;
}
