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
