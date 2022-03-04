export interface ICitizenFormDataForTableResponse {
  total: number;
  data: {
    id: number;
    name: string;
    last_name: string;
    address: string;
    phone_number: string;
    is_done: boolean;
  }[];
}

type ICitizenFormResponseData =
  ICitizenFormDataForTableResponse['data'][number];

export interface ICitizenFormDataForTable extends ICitizenFormResponseData {
  key: number;
}
