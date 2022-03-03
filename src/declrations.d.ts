/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.module.scss' {
  const classes: Record<string, string>;

  export default classes;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare type ValueOf<T> = T[keyof T];
