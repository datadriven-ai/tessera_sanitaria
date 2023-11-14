export interface SessionState {
  bypass: string;
  challengeToken: string;
  jwtToken: string | undefined;
  user: UserInfo;


  scope: string;
  email_verified: string;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  sub: string;
  userID: number;
  resource_access: any;
  realm_access: any;
}

export interface UserInfo {
  canLogin?: boolean;
  userId: number;
  address: string;
  avatar: string;
  birthDate: string;
  birthPlace: string;
  cap: string;
  channel: string;
  channelId: string;
  city: string;
  dateAcceptancePrivacy: string;
  fiscalCode: string;
  email: string;
  gender: string;
  name: string;
  nation: string;
  phoneNumber: string;
  province: string;
  roles: string[];
  surname: string;
  consent: any[];
}
