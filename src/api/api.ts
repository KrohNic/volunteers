import type { ICitizenFormDataForTableResponse } from 'pages/AdminsRoom/types.AdminsRoom';
import type {
  ICitizensFormErrors,
  ICitizensFormValues,
} from 'pages/Citizens/types.Citizens';

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

export const setCitizenFormIsDone = (
  id: number,
  isDone: boolean,
): Promise<{ id: number; isDone: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, isDone }), 1000);
  });
};
