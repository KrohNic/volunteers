import React from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from 'constants/routes';

const NavigateToNotFound = () => (
  <Navigate to={ROUTES.notFound} state={{ from: window.location.href }} />
);

export default NavigateToNotFound;
