import React, { Component, ErrorInfo } from 'react';
import ErrorPage from './ErrorPage';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  eventId: string | null;
};

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      eventId: null
    };
    this.clearState = this.clearState.bind(this);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  // reset state property to take user back to Home page
  clearState() {
    this.setState({
      error: null,
      errorInfo: null,
      eventId: null
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorPage clearState={this.clearState} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
