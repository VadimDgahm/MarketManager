import {
  AddressClient,
  PhoneClient,
} from "@/services/clients/clientsServicesType";

export type OrderType = {
  productId: string;
  comments: string;
  isGift: boolean;
  name: string;
  positionId: string;
  quantity: string;
  reductionName: string;
  view: string;
  sortValue?: number;
};

export type OrderDeliveryRouteType = {
  _id: string;
  name: string;
};

export type ClientDataBriefcase = {
  status: string;
  source: string;
  phones: PhoneClient[];
  addresses: AddressClient[];
};

export type BriefcaseOrder = {
  dataClient: ClientDataBriefcase;
  addressId: string;
  clientId: string;
  clientName: string;
  createdDate: string;
  orderClient: OrderType[];
  orderId: string;
  timeDelivery: string;
  dayDelivery: string;
  deliveryRoute: OrderDeliveryRouteType | null
  sort?: number,
  briefcaseId? : string,
  time?: string,
  invoiceOrderItems?: OrderItemsResponse[],
  totalAmount?: number,
  discount?: number,
  priceDelivery?: number,
  finalTotalAmount?: number,
  markOrder?: boolean,
  userId?: string,
};


export type OrderItemsRequest = {
  productId: string;
  positionId: string;
  comments: string;
  weight: number;
  units:string;
  isGift: boolean
}

export type OrderItemsResponse = {
  productPrice: number;
  amount: number;
  name: string;

} & OrderItemsRequest;


export type BriefcaseType = {
  name: string;
  id: string;
  createdDate: string;
  orders: BriefcaseOrder[];
  userId: string;
};

