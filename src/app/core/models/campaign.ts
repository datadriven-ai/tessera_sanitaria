export interface Campaign {
  id: number;
  startDate: string;
  endDate: string;
  code: string;
  description: string | null;
  channelId: number[];
  strategyId: number | null;
  campaignProductsChannel: number[];
  isInterrupted: boolean;
  value: number | null;
  valueType: string | null;
}

export enum CAMPAIGN_STATUS {
  BOOKED = 'FUTURE',
  STARTED = 'IN_CORSO',
  DONE = 'TERMINATO'
}
