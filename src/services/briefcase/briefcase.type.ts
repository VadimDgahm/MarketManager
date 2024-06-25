import {
  AddressClient,
  PhoneClient,
} from "@/services/clients/clientsServicesType";

export type OrderType = {
  comments: string;
  name: string;
  positionId: string;
  quantity: string;
  reductionName: string;
  view: string;
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
  time?: string
};
export type BriefcaseType = {
  name: string;
  id: string;
  createdDate: string;
  orders: BriefcaseOrder[];
  userId: string;
};
