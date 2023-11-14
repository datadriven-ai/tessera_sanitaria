export interface CatalogItem {
  category: string;
  products: Product[],
}

export interface Product {
  id: number;
  productCode: string;
  name: string;
  price: number;
  discountPrice: number;
  type: string;
  categoryDescription: string;
  categoryImagineUrl: string;
  orderPosition: number;
  productChannelId: number;
  channelId: number;
  vat: number;
  channelDescription: string;
  visitInfo: {
    duration: number;
    visitType: string;
    visitLocations: any[] | null;
  };
  kitProducts: any[]
}
