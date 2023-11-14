export interface Partner {
  channelId: number;
  conventionCode: string;
  conventionId: number;
  enabled: boolean;
  end: string | null,
  invalidDomain: string[] | null;
  name: string;
  registrationType: REGISTRATION_TYPE;
  start: string | null;
  twoFactorAuthenticator: string;
  type: PARTNER_TYPE;
  validDomain: string[] | null;
  productChannelId: number[];
}

export enum REGISTRATION_TYPE {
  Default = 'NOR',
  PreApproved = 'PRE'
}

export enum PARTNER_TYPE {
  Loco = 'LOCO',
  Online = 'ONLINE'
}
