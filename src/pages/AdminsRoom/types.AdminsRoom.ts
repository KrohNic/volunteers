export interface ICitizenFormDataForTableResponse {
  count: number;
  results: {
    id: number;
    name: string;
    last_name: string;
    address: string;
    phone_number: string;
    is_done: boolean;
  }[];
}

type ICitizenFormResponseData =
  ICitizenFormDataForTableResponse['results'][number];

export interface ICitizenFormDataForTable extends ICitizenFormResponseData {
  key: number;
}
