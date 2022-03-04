import React, { createContext, FC, useState } from 'react';

import type { ICitizenTablePageContext } from 'pages/AdminsRoom/PageProvider/types.PageProvider';
import type { ICitizenFormDataForTable } from 'pages/AdminsRoom/types.AdminsRoom';

const emptyArray: ICitizenFormDataForTable[] = [];

export const PageContext = createContext<ICitizenTablePageContext>([
  emptyArray,
  () => {},
]);

export const PageProvider: FC = ({ children }) => {
  const state = useState<ICitizenFormDataForTable[]>(emptyArray);

  return <PageContext.Provider value={state}>{children}</PageContext.Provider>;
};
