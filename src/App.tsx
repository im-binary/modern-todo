import { TokenContextProvider } from "./contexts/TokenContext";
import { Suspense } from "react";
import { ErrorBoundary, RenderFallbackProps } from "./components/ErrorBoundary";
import { Router } from "./Router";
import ErrorAlert from "./components/ErrorAlert";
import "./App.css";

function RenderFallback({ error, children, reset }: RenderFallbackProps) {
  return (
    <>
      <ErrorAlert errorMessage={error.message} reset={reset} />
      {children}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary renderFallback={RenderFallback}>
      <Suspense fallback={<h1>loading...</h1>}>
        <TokenContextProvider>
          <Router />
        </TokenContextProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
