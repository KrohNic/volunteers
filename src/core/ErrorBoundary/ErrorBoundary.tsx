import React, { Component, ReactNode } from 'react';
import { Button } from 'antd';

import { ROUTES } from 'constants/routes';

import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
  errorName: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMsg: '', errorName: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.message, errorName: error.name };
  }

  componentDidMount() {
    window.addEventListener(
      'unhandledrejection',
      this.handleUnhandledRejection,
    );
  }

  componentDidCatch(error: Error) {
    this.setState((state) => ({
      ...state,
      hasError: true,
      errorName: error.name,
      errorMsg: error.message,
    }));
  }

  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.handleUnhandledRejection,
    );
  }

  handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.preventDefault();

    this.setState((state) => ({
      ...state,
      hasError: true,
      errorMsg: event.reason.message,
      errorName: event.reason.name,
    }));
  };

  static handleReload = () => {
    window.location.assign(ROUTES.root);
  };

  render() {
    const { hasError, errorMsg, errorName } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className={styles.main_layout}>
          <h3 className={styles.title}>Похоже, произошёл сбой</h3>
          <span className={styles.text}>{`${errorName}: ${errorMsg}`}</span>
          <Button
            type='primary'
            onClick={ErrorBoundary.handleReload}
            className={styles.go_root_btn}
          >
            Перейти на главную страницу
          </Button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
