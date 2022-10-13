import { useState, useCallback } from "react";

export default function useFormField(validators: { valid: (value: string) => boolean; message: string }[]) {
  const [value, setValue] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);

  const valid = validators.map(({ valid, message }) => (valid(value) ? "" : message));

  const errorMessage = valid.filter((message) => message !== "")[0];

  return { value, onChange, errorMessage };
}
