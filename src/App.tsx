import { TokenContextProvider } from "./contexts/TokenContext";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Router } from "./Router";
import ErrorAlert from "./components/ErrorAlert";
import "./App.css";

function App() {
  const [isModalOpen] = useState(true);

  return (
    <ErrorBoundary
      // TODO: alret DOM 만들기
      renderFallback={({ error, children, reset }) => (
        <>
          <ErrorAlert isModalOpen={isModalOpen} errorMessage={error.message} reset={reset} />
          {children}
        </>
      )}
    >
      <Suspense fallback={<h1>loading...</h1>}>
        <TokenContextProvider>
          <Router />
        </TokenContextProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
