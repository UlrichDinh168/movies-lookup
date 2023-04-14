import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

import ErrorPage from './ErrorPage';
type ErrorBoundaryState = {
  error: Error | null;
  errorInfo: any;
  eventId: string | null;
}

class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null, eventId: null };
    this.clearState = this.clearState.bind(this);
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    if (process.env.NODE_ENV === 'production') {
      Sentry.withScope((scope) => {
        scope.setTag('Custom-Tag', 'ErrorBoundary');
        // scope.setLevel(level);
        // scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    }
  }

  clearState() {
    this.setState({ error: null, errorInfo: null, eventId: null });
  }

  render() {
    if (this.state?.error !== null) {
      return <ErrorPage clearState={this.clearState} />;
    }
  }
}


export default ErrorBoundary;
