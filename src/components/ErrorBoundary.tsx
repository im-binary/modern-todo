import { Component, ErrorInfo, ReactNode } from "react";
import { EventErrorHandler } from "./EventErrorHandler";

export interface RenderFallbackProps {
  error: Error;
  reset: () => void;
  children?: ReactNode;
}

type RenderFallback = ({ error, reset, children }: RenderFallbackProps) => ReactNode;

interface Props {
  children?: ReactNode;
  renderFallback: RenderFallback;
}

interface State {
  error?: Error;
}

// NOTE: ErrorBoundary 는 클래스 컴포넌트로만 작성할 수 있어 부득이하게 클래스 컴포넌트를 이용합니다.
export class OriginalErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  constructor(props: Props) {
    super(props);
    this.state = { error: undefined };
  }

  resetErrorBoundary = () => {
    this.setState({ error: undefined });
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { renderFallback, children } = this.props;

    if (error != null) {
      return renderFallback({ error, reset: this.resetErrorBoundary });
    }

    return children;
  }
}

export function ErrorBoundary({ children, ...props }: { children?: ReactNode; renderFallback: RenderFallback }) {
  return (
    <OriginalErrorBoundary
      {...props}
      renderFallback={({ error, reset }) => props.renderFallback({ error, children, reset })}
    >
      <EventErrorHandler>{children}</EventErrorHandler>
    </OriginalErrorBoundary>
  );
}
