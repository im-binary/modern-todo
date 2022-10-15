import { useEffect, useState } from "react";

export default function useEventErrorHandle() {
  const [error, setError] = useState<any | null>(null);

  if (error != null) {
    throw error;
  }

  const unhandledRejection = (error: any) => {
    setError(new Error(error.reason.message));
  };

  const errorEvent = (event: any) => {
    setError(event.error);
  };

  useEffect(() => {
    window.addEventListener("unhandledrejection", unhandledRejection);
    window.addEventListener("error", errorEvent);

    return () => {
      window.removeEventListener("unhandledrejection", unhandledRejection);
      window.removeEventListener("error", errorEvent);
    };
  }, []);

  return [error, setError] as const;
}
