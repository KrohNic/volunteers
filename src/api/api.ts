import type { ICitizenFormDataForTableResponse } from 'pages/AdminsRoom/types.AdminsRoom';
import type {
  ICitizensFormErrors,
  ICitizensFormValues,
} from 'pages/Citizens/types.Citizens';
import type {
  IAuthTokens,
  IToken,
  IUserAuth,
  IUserAuthError,
} from 'pages/Login/types.Login';

import * as endpoints from './endpoints';

export const getCitizenFormsList = async (
  pageNumber: number,
  pageSize: number,
  accessToken: IAuthTokens['accessToken'],
): Promise<ICitizenFormDataForTableResponse> => {
  const response = await fetch(
    `${endpoints.citizenForm}?limit=${pageSize}&offset=${
      pageSize * pageNumber
    }"`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `JWT ${accessToken.token}`,
      },
    },
  );

  return response.json();
};

export const saveCitizenForm = async (
  body: ICitizensFormValues,
): Promise<ICitizensFormValues | ICitizensFormErrors> => {
  const response = await fetch(endpoints.citizenForm, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.json();
};

export const getCitizenForm = async (
  formId: number,
  accessToken: IAuthTokens['accessToken'],
): Promise<ICitizensFormValues> => {
  const response = await fetch(`${endpoints.citizenForm}${formId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${accessToken.token}`,
    },
  });

  return response.json();
};

export const setCitizenFormIsDone = async (
  formId: number,
  isDone: boolean,
  accessToken: IAuthTokens['accessToken'],
): Promise<unknown> => {
  const response = await fetch(`${endpoints.citizenForm}${formId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${accessToken.token}`,
    },
    body: JSON.stringify({ is_done: isDone }),
  });

  return response.json();
};

export const login = async (
  body: IUserAuth,
): Promise<IAuthTokens | IUserAuthError> => {
  const response = await fetch(endpoints.tokens, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      username: body.login,
      password: body.password,
    }),
  });

  const json = await response.json();

  const { access, refresh } = json as unknown as {
    access: IToken;
    refresh: IToken;
  };

  return { accessToken: access, refreshToken: refresh };
};

export const getNewTokens = async (
  refreshToken: IAuthTokens['refreshToken'],
): Promise<IAuthTokens> => {
  const response = await fetch(endpoints.refreshTokens, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      refresh: refreshToken.token,
    }),
  });

  const json = await response.json();

  const { access, refresh } = json as unknown as {
    access: IToken;
    refresh: IToken;
  };

  return { accessToken: access, refreshToken: refresh };
};
