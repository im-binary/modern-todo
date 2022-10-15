import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTokenContext } from "./contexts/TokenContext";
import { Join } from "./pages/Join";
import { Login } from "./pages/Login";
import { TodoPage } from "./pages/TodoPage";

const GuestRoutes = ["Login", "Join"];
const MemberRoutes = ["TodoList"];

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={withAuthGuard(<Login />)} />
        <Route path='/signup' element={withAuthGuard(<Join />)} />
        <Route path='/todo' element={withAuthGuard(<TodoPage />)} />
      </Routes>
    </BrowserRouter>
  );
}

// TODO: components 디렉토리로 이동하기
function Redirect({ to }: { to: string }) {
  return <Navigate replace to={to} />;
}

// TODO: hocs 디렉토리로 이동하기
function withAuthGuard(Component: JSX.Element) {
  return (() => {
    const { isLogin } = useTokenContext();

    const { name } = Component.type;

    if (!isLogin && MemberRoutes.includes(name)) {
      return <Redirect to='/' />;
    }

    if (isLogin && GuestRoutes.includes(name)) {
      return <Redirect to='/todo' />;
    }

    return Component;
  })();
}
