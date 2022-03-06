export interface IUserAuth {
  login: string;
  password: string;
  remember: boolean;
}

export interface IUserAuthError {
  detail: string;
}

export interface IToken {
  token: string;
  expires_at: string;
  token_type: string;
}

export interface IAuthTokens {
  accessToken: IToken;
}
