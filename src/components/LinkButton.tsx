import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface Props {
  to: string;
  buttonType?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

export default function LinkButton({ to, buttonType = "button", children }: Props) {
  return (
    <Link to={to}>
      <Button type={buttonType}>{children}</Button>
    </Link>
  );
}
