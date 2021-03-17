import { exception } from 'console';
import React from 'react';

interface errorBoundaryState {
  hasError: boolean;
}

export const ThrowsError = () => {
  throw exception('This is failing.');
};

export default class ErrorBoundary extends React.Component<
  {},
  errorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // console.log(error);
    // console.log(errorInfo);
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <p>
          The application failed. Please log an issue{' '}
          <a href="https://github.com/codeforboston/jobhopper">here</a> and
          describe what happened.
        </p>
      );
    }

    return this.props.children;
  }
}
