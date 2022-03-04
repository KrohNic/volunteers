import React, {
  createContext,
  FC,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import type { IAuthContext } from 'core/auth/types.auth';
import type { IAuthTokens } from 'pages/Login/types.Login';

import { ROUTES } from 'constants/routes';
import { AUTH_TOKEN_STORAGE_KEY } from './constants.auth';

export const AuthContext = createContext<IAuthContext>({
  tokens: null,
  signin: () => {},
  signout: () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState<IAuthTokens | null>(null);

  const signin: IAuthContext['signin'] = useCallback(
    (token, remember = false) => {
      setAuthTokens(token);

      if (remember) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify(token));
      }
    },
    [],
  );

  const signout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    setAuthTokens(null);
    navigate(ROUTES.root);
  }, [navigate]);

  const value = useMemo(
    () => ({ tokens: authTokens, signin, signout }),
    [signin, signout, authTokens],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
