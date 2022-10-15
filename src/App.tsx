import { TokenContextProvider } from "./contexts/TokenContext";
import { Suspense } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Router } from "./Router";

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
        <TokenContextProvider>
          <Router />
        </TokenContextProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
