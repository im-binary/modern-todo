import { useEffect, useState } from "react";

type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Validator {
  ok: (value: string) => boolean;
  message: string;
}

export default function useFormField(validators: Validator[]) {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();

  const onChange = (e: OnChangeEvent) => setValue(e.target.value);

  useEffect(() => {
    for (const validator of validators) {
      if (!validator.ok(value)) {
        setErrorMessage(validator.message);
        return;
      }
    }
    setErrorMessage(undefined);
  }, [value]);

  return [value, onChange, errorMessage] as const;
}
