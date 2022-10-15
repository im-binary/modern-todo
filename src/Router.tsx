import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTokenContext } from "./contexts/TokenContext";
import { Join } from "./pages/Join";
import { Login } from "./pages/Login";
import { TodoPage } from "./pages/TodoPage";

const GuestRoutes = ["Login", "Join"];
const MemberRoutes = ["TodoPage"];

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={withAuthGuard(<Login />)} />
        <Route path='/signup' element={withAuthGuard(<Join />)} />
        <Route path='/todo' element={withAuthGuard(<TodoPage />)} />
        <Route path='*' element={<Redirect to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

// TODO: components 디렉토리로 이동하기
function Redirect({ to }: { to: string }) {
  console.log(`redirect to ${to}`);

  return <Navigate replace to={to} />;
}

// TODO: hocs 디렉토리로 이동하기
function withAuthGuard(Component: JSX.Element) {
  return (() => {
    const { isLogin } = useTokenContext();

    const { name } = Component.type;
    console.log(`current Router: ${name} and login is ${isLogin}`);

    if (!isLogin && MemberRoutes.includes(name)) {
      return <Redirect to='/' />;
    }

    if (isLogin && GuestRoutes.includes(name)) {
      return <Redirect to='/todo' />;
    }

    return Component;
  })();
}
