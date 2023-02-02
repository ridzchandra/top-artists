import React from 'react';
import { logError } from '../lib/errorLib';
import './styles/ErrorBoundary.css';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  // The key part of this component is the componentDidCatch and getDerivedStateFromError methods.
  // These get triggered when any of the child components have an unhandled error.
  // We set the internal state, hasError to true to display our fallback UI.
  // And we report the error to Sentry by calling logError with the error and errorInfo that comes with it.
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <div className="ErrorBoundary text-center">
        <h3>Sorry there was a problem loading this page</h3>
      </div>
    ) : (
      this.props.children
    );
  }
}
