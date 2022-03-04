import type { ICitizenFormDataForTable } from 'pages/AdminsRoom/types.AdminsRoom';

export type ICitizenTablePageContext = [
  ICitizenFormDataForTable[],
  React.Dispatch<React.SetStateAction<ICitizenFormDataForTable[]>>,
];
