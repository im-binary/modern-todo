import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTokenContext } from "./contexts/TokenContext";
import { Join } from "./pages/Join";
import { Login } from "./pages/Login";
import TodoList from "./pages/TodoList";

export function Router() {
  const { isLogin } = useTokenContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLogin ? <Navigate replace to='/todo' /> : <Login />} />
        <Route path='/signup' element={isLogin ? <Navigate replace to='/todo' /> : <Join />} />
        <Route path='/todo' element={isLogin ? <TodoList /> : <Navigate replace to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}
