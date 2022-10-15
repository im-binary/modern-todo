import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Login } from "./pages/Login";
import { Join } from "./pages/Join";
import Todo from "./pages/Todo";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token != null) {
      setIsLogin(true);
    }
  }, [isLogin]);
  return (
    <ErrorBoundary
      // TODO: alret DOM 만들기
      renderFallback={({ error, children, reset }) => (
        <>
          <>{error.message}</>
          <>{children}</>
          <button onClick={reset}>확인</button>
        </>
      )}
    >
      <Suspense fallback={<h1>loading...</h1>}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Join />} />
            <Route path='/todo' element={<Todo />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
