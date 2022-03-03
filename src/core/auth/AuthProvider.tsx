import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import { AUTH_TOKEN_STORAGE_KEY } from './constants.auth';

import type { IAuthContext, IAuthToken } from './types.auth';

export const AuthContext = createContext<IAuthContext>({
  authToken: null,
  signin: () => {},
  signout: () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [authToken, setAuthToken] = useState<IAuthToken | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenStr = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    if (tokenStr === null) return;

    const token = JSON.parse(tokenStr) as IAuthToken;
    const isExpired = new Date(token.expires_at) < new Date();

    if (!isExpired) setAuthToken(token);
  }, []);

  const signin: IAuthContext['signin'] = useCallback(
    (token, remember, from) => {
      setAuthToken(token);

      if (remember) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify(token));
      }

      if (from) {
        navigate(from);
      } else {
        navigate(ROUTES.root);
      }
    },
    [navigate],
  );

  const signout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    setAuthToken(null);
  }, []);

  const value = useMemo(
    () => ({ authToken, signin, signout }),
    [signin, signout, authToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
