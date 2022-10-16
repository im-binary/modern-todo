/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
interface Props {
  children: React.ReactNode;
}

export default function Title({ children }: Props) {
  return (
    <h1
      css={css`
        font-size: 2.8rem;
      `}
    >
      {children}
    </h1>
  );
}
