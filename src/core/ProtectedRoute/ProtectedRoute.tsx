import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

import type { IAuthTokens } from 'pages/Login/types.Login';

import { useAuth } from 'core/auth/useAuth';
import { AUTH_TOKEN_STORAGE_KEY } from 'core/auth/constants.auth';
import Loader from 'components/Loader/Loader';
import { ROUTES } from 'constants/routes';

const ProtectedRoute: FC = ({ children }) => {
  const { tokens, signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const navigateToLogin = useCallback(
    () =>
      navigate(ROUTES.login, {
        replace: true,
        state: { from: location.pathname },
      }),
    [location.pathname, navigate],
  );

  useEffect(() => {
    const tokenStr = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    if (tokenStr === null) {
      setIsLoading(false);
      return;
    }

    const authTokens = JSON.parse(tokenStr) as IAuthTokens;
    const fiveMinAfterNow = new Date(new Date().getTime() + 5 * 60 * 1000);
    const isAccessExpired =
      new Date(authTokens.accessToken.expires_at) < fiveMinAfterNow;

    if (!isAccessExpired) {
      signin(authTokens);
    } else {
      navigateToLogin();
    }

    setIsLoading(false);
  }, [navigateToLogin, signin]);

  if (isLoading) return <Loader />;

  if (tokens === null) {
    return (
      <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />
    );
  }

  return <React.Fragment key='child'>{children}</React.Fragment>;
};

export default ProtectedRoute;
