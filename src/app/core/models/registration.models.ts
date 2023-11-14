export interface RegisterUserDTO {
  userId?: string;
  username?: string;
  password?: string;
  name: string;
  surname: string;
  gender: string;
  birthCityId?: number;
  birthDate: string;
  fiscalCode: string;
  email: string;
  telephone: string;
  channelId: string;
  homeCap?: string;
  homeAddress?: string;
  homeTownId?: number;
  agreementId?: number;
  acceptedConditions?: {id: number, accepted: boolean}[];
}


export interface PrivacyTerm {
  id: number;
  code: string;
  title: string;
  description: string;
  isRequired: boolean;
  link: string;
}

export interface City {
  id: number;
  city: string;
  postalCode: string;
  province: string;
  region: string;
  cityCode: string;
  istatCode: string;
  prefixPhone: string;
}
export interface Nation {
  code: string;
  description:  string;
  id: number;
  iso2:  string;
  iso3:  string;
}

export interface PhoneCountry {
  name: string;
  dial_code: string;
  code: string;
}
