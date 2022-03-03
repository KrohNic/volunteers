import type { ICitizensFormValues } from './types.Citizens';

export const citizensFormInitialValues: Partial<ICitizensFormValues> = {
  number_of_people: 1,
  languages: 'Українська, ',
  budget: 0,
};

export const animCaptchaTransition = { delay: 0.5 };
