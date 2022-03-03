export interface IAuthToken {
  access_token: string;
  expires_at: string;
  token_type: string;
}

export type IAuthContext = {
  authToken: IAuthToken | null;
  signin: (
    token: IAuthToken,
    remember: boolean,
    from: string | undefined,
  ) => void;
  signout: () => void;
};
