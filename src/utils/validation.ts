import type { AnySchema } from 'yup';

interface IValidateError<T> {
  inner: Array<{
    path: keyof T;
    message: string;
  }>;
}

export const validate = <T extends {}>(schema: AnySchema, target: T) => {
  try {
    schema.validateSync(target, { abortEarly: false });
  } catch (validateError) {
    const errors: Partial<Record<keyof T, string>> = {};

    (validateError as IValidateError<T>).inner.forEach((errorInner) => {
      errors[errorInner.path] = errorInner.message;
    });

    return errors;
  }

  return null;
};
