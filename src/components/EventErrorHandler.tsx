import { ReactNode, useEffect, useState } from 'react';

export function EventErrorHandler({ children }: { children: ReactNode }) {
  const [error, setError] = useState<ErrorEvent['error'] | Error | null>(null);

  if (error != null) {
    throw error;
  }

  const unhandledRejection = (error: PromiseRejectionEvent) => {
    setError(new Error(error.reason.message));
  };

  const errorEvent = (event: ErrorEvent) => {
    setError(event.error);
  };

  useEffect(() => {
    window.addEventListener('unhandledrejection', unhandledRejection);
    window.addEventListener('error', errorEvent);

    return () => {
      window.removeEventListener('unhandledrejection', unhandledRejection);
      window.removeEventListener('error', errorEvent);
    };
  }, []);

  return <>{children}</>;
}
