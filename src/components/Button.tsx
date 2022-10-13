type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
