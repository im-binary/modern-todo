import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback: ({ error }: { error: Error }) => ReactNode;
}

interface State {
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  updatedWithError = false;

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error });
    console.error("Uncaught error:", error, errorInfo);
  }

  componentDidMount() {
    console.log("ErrorBoundary mounted");
    const { error } = this.state;
    if (error != null) {
      this.updatedWithError = true;
    }
  }

  componentDidUpdate() {
    const { error } = this.state;
    if (error != null && !this.updatedWithError) {
      this.updatedWithError = true;
      return;
    }

    if (error != null) {
      this.updatedWithError = false;
      this.setState({ error: undefined });
    }
  }

  render() {
    if (this.state.error) {
      const fallbackUI = this.props.fallback({ error: this.state.error });
      if (fallbackUI == null) {
        return this.props.children;
      } else {
        return fallbackUI;
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
