import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Login from "./pages/Login";
import Todo from "./pages/Todo";

function Alert({ error }: { error: Error }) {
  useEffect(() => {
    alert(error.message);
  }, []);

  return null;
}

function App() {
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
            <Route path='/todo' element={<Todo />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
