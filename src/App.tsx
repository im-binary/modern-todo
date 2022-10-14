import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
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
    <ErrorBoundary fallback={Alert}>
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
