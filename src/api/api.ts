import type { ICitizenFormDataForTableResponse } from 'pages/AdminsRoom/types.AdminsRoom';
import type {
  ICitizensFormErrors,
  ICitizensFormValues,
} from 'pages/Citizens/types.Citizens';
import type {
  IAuthTokens,
  IUserAuth,
  IUserAuthError,
} from 'pages/Login/types.Login';

import { citizenForm } from './endpoints';

export const saveCitizenForm = async (
  body: ICitizensFormValues,
): Promise<ICitizensFormValues | ICitizensFormErrors> => {
  const response = await fetch(citizenForm, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.json();
};

export const getCitizenFormsList = (
  page: number,
): Promise<ICitizenFormDataForTableResponse> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          total: 200,
          data: [
            {
              id: 0,
              name: 'name',
              last_name: 'last_name',
              address: 'address',
              phone_number: 'phone_number',
              is_done: true,
            },
            {
              id: page,
              name: 'name',
              last_name: 'last_name',
              address: 'address',
              phone_number: 'phone_number',
              is_done: false,
            },
          ],
        }),
      1000,
    );
  });
};

export const getCitizenForms = (
  formId: number,
): Promise<ICitizensFormValues> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          id: formId,
          created_at: 'string',
          updated_at: 'string',
          city: 'string',
          name: 'string',
          last_name: 'string',
          number_of_people: 2,
          phone_number: '15151515155',
          is_passport: true,
          is_international_passport: false,
          is_education_doc: true,
          is_childs_birth_certificate: true,
          languages: 'string',
          budget: 412,
          is_pets: true,
          is_pet_carrier: false,
          is_passport_for_animals: true,
          is_luggage: false,
          is_point: true,
          criminal_records: false,
          health_characteristics: 'string',
          additionally: '',
          is_done: true,
        }),
      1000,
    );
  });
};

export const setCitizenFormIsDone = (
  id: number,
  isDone: boolean,
): Promise<{ id: number; isDone: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, isDone }), 1000);
  });
};

export const login = (
  body: IUserAuth,
): Promise<IAuthTokens | IUserAuthError> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          Date.now() % 2
            ? {
                accessToken: {
                  token: body.password,
                  expires_at: '2022-03-05',
                  token_type: 'JWT',
                },
                refreshToken: {
                  token: 'a',
                  expires_at: '2022-03-05',
                  token_type: 'JWT',
                },
              }
            : {
                detail: 'No active account found with the given credentials',
              },
        ),
      1000,
    );
  });
};

export const updateTokens = (
  body: IAuthTokens['refreshToken'],
): Promise<IAuthTokens> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          accessToken: {
            token: body.token_type,
            expires_at: '2022-03-05',
            token_type: 'JWT',
          },
          refreshToken: {
            token: 'a',
            expires_at: '2022-03-05',
            token_type: 'JWT',
          },
        }),
      1000,
    );
  });
};
