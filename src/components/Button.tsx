/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function Button({ children, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      css={css`
        display: block;
        width: 100%;
        background-color: #dc602a;
        border: 0;
        border-radius: 20px;
        color: #fff;
        font-weight: 600;
        letter-spacing: 1.2px;
        cursor: pointer;
      `}
    >
      {children}
    </button>
  );
}
