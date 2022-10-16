/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface Props {
  to: string;
  buttonType?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

export default function LinkButton({ to, buttonType = "button", children }: Props) {
  return (
    <Link
      to={to}
      css={css`
        display: block;
        text-decoration-color: #dc602a;
      `}
    >
      <Button
        css={css`
          background: transparent;
          color: #dc602a;
        `}
        type={buttonType}
      >
        {children}
      </Button>
    </Link>
  );
}
