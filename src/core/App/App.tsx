import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ErrorBoundary } from 'core/ErrorBoundary/ErrorBoundary';
import { AuthProvider } from 'core/auth/AuthProvider';
import Router from 'core/Routers/Router';

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
