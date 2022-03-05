export interface ICitizensFormValues {
  id: number;
  created_at: string;
  updated_at: string;
  city: string;
  name: string;
  last_name: string;
  tg_username: string;
  number_of_people: number;
  phone_number: string;
  is_passport: boolean;
  is_international_passport: boolean;
  is_education_doc: boolean;
  is_childs_birth_certificate: boolean;
  languages: string;
  budget: number;
  is_pets: boolean;
  is_pet_carrier: boolean;
  is_passport_for_animals: boolean;
  is_luggage: boolean;
  is_point: boolean;
  criminal_records: boolean;
  health_characteristics: string;
  additionally: string;
  is_done: boolean;
}

export type ICitizensFormErrors = {
  errors: Partial<Record<keyof ICitizensFormValues, string>>;
};
