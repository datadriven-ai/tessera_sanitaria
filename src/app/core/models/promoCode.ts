export interface PromoCode {
  id: number;
  description: string;
  code: string;
  value: number;
  valueType: "PERCENTAGE" | "AMOUNT";
  startDate: string;
  endDate: string;
  cumulative: boolean;
  maxValidity: number;
  channelId: number[];
  productChannelId: number[];
  isActive: boolean;
}
