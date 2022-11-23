import { useEffect, useState } from 'react';

type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Validator {
  ok: (value: string) => boolean;
  message: string;
}

export function useFormField({
  initialValue,
  validators,
}: {
  initialValue?: string;
  validators: Validator[];
}) {
  const [value, setValue] = useState(initialValue ?? '');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [firstRender, setFirstRender] = useState(true);

  const onChange = (e: OnChangeEvent) => setValue(e.target.value);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      setErrorMessage('');
      return;
    }

    for (const validator of validators) {
      if (!validator.ok(value)) {
        setErrorMessage(validator.message);
        return;
      }
    }
    setErrorMessage(undefined);
    // NOTE: 최초 렌더링시 에러 메시지 비활성
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, JSON.stringify(validators)]);

  const clearValue = () => setValue('');

  return {
    value,
    onChange,
    errorMessage,
    setValue,
    clearValue,
    setFirstRender,
  } as const;
}
