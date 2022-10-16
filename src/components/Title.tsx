/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Title({ className, children }: Props) {
  return (
    <h1
      className={className}
      css={css`
        font-size: 2.8rem;
      `}
    >
      {children}
    </h1>
  );
}
