

export interface User {
  userId: string;
  enabled: boolean;
  name: string;
  surname: string;
  fiscalCode: string;
  email: string;
  phoneNumber: string;
  gender: string;
  creationDate: string | null;
  roles: string[];
  channel: string;
  channelId: null;
  avatar: string;
  isGuest: boolean;
  cap: string;
  birthPlace: string;
  city: string;
  nation: string;
  province: string;
  consent: any;
  dateAcceptancePrivacy: string;
  interviewCompleted: boolean;
  birthDate: string;
  address: string;
  locationId: string | null;
}

export interface Convention {
  id:string;
  name:string;
  type:string;
}

export interface Medic {
  userId: number;
  enabled: boolean;
  name: string;
  surname: string;
  fiscalCode: string;
  email: string;
  phoneNumber: string;
  gender: string;
  creationDate: string | null;
  roles: string[];
  nationalDtRegCertificate: string;
  nationalRegCertificate: string;
  nationalRegCertificateCode: string;
  nationalRegCertificateName: string;
  professionTitle: string;
  qualification: string;
  qualificationClassLevel: string;
  associatedChannel: any[];
  visitType: string[];
  hasAvailabilities: boolean;
  birthDate: string | null;
  address: string;
  cap: string;
  city: string;
}

export interface BaseUser {
  userId: number;
  name: string;
  convention: string | null;
  surname: string;
  email: string;
  phoneNumber: string;
  roles: USER_ROLES[];
  gender: string;
  fiscalCode: string;
  enabled: boolean;
  canBeModified: boolean;
  canBeDeleted: boolean;
  locations: Location[];
  medics?: number[];
  specializations: string[];
}

export interface Location {
  id: number;
  channelId: number;
  name: string;
}

export enum USER_ROLES {
  USER = 'USER',
  MEDIC = 'MEDIC',
  SECRETARY = 'SECRETARY',
  BACKOFFICE = 'BACKOFFICE',
  HEALTHPOINT = 'OPS',
  ADMIN = 'ADMIN-BACKOFFICE',
}

export interface Branch {
  "id": number;
  "name": string;
}


export interface Patient {
  userId: number;
  enabled: boolean;
  name: string;
  surname: string;
  fiscalCode: string;
  email: string;
  phoneNumber: string;
  gender: string;
  creationDate: string;
  roles: string[],
  channel: string;
  channelId: string;
  avatar: string;
  isGuest: boolean,
  cap: string;
  birthPlace: string;
  city: string;
  nation: string;
  province: string;
  consent: any[],
  dateAcceptancePrivacy: string;
  interviewCompleted: boolean;
  birthDate: string;
  address: string;

}
