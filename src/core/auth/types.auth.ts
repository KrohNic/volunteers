import type { IAuthTokens } from 'pages/Login/types.Login';

export type IAuthContext = {
  tokens: IAuthTokens | null;
  signin: (tokens: IAuthTokens, remember?: boolean) => void;
  signout: (from?: string) => void;
};
