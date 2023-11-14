import {BaseUser} from "./user.model";

export interface Order  {
  id: number;
  user: BaseUser;
  creationDate: string;
  status: string;
  locationId: number | null;
  channelId: number;
  totalAmount: number;
  totalDiscount: number;
  totalVat: number;
  paymentId: number | null;
  paymentMethods: any;
  products: Product[];
  activePromotions: string | null;
  activeCampaign: string | null;
}

export interface Product {
  orderId: number;
  detailId: number;
  description: string;
  category: string;
  amount: number;
  unitPrice: number;
  discountedUnitPrice: number | null;
  vat: number;
  qty: number;
  bookingId: number | null;
  modifiedPrice: boolean;
  orderDetailPromotion: string | null;
}
