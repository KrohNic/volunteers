import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

import type { IAuthTokens } from 'pages/Login/types.Login';

import { useAuth } from 'core/auth/useAuth';
import { AUTH_TOKEN_STORAGE_KEY } from 'core/auth/constants.auth';
import { getNewTokens as updateTokensApi } from 'api/api';
import Loader from 'components/Loader/Loader';
import { ROUTES } from 'constants/routes';

const ProtectedRoute: FC = ({ children }) => {
  const { tokens, signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const updateTokens = useCallback(
    async (refreshToken: IAuthTokens['refreshToken']) => {
      setIsLoading(true);

      const newTokens = await updateTokensApi(refreshToken);

      signin(newTokens, true);
      setIsLoading(false);
    },
    [signin],
  );

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
    const isAccessExpired =
      new Date(authTokens.accessToken.expires_at) < new Date();

    if (!isAccessExpired) {
      signin(authTokens);
      setIsLoading(false);
      return;
    }

    const isRefreshExpired =
      new Date(authTokens.refreshToken.expires_at) < new Date();

    if (!isRefreshExpired) {
      updateTokens(authTokens.refreshToken);
    } else {
      navigateToLogin();
    }

    setIsLoading(false);
  }, [navigateToLogin, updateTokens, signin]);

  if (isLoading) return <Loader />;

  if (tokens === null) {
    return (
      <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />
    );
  }

  return <React.Fragment key='child'>{children}</React.Fragment>;
};

export default ProtectedRoute;
