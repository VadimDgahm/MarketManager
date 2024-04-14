export type OrderType = {
  comments: string;
  name: string;
  positionId: string;
  quantity: string;
  reductionName: string;
  view: string;
};
export type BriefcaseOrder = {
  addressId: string;
  clientId: string;
  clientName: string;
  createdDate: string;
  orderClient: OrderType[];
  orderId: string;
  timeDelivery: string;
  dayDelivery: string;
};
export type BriefcaseType = {
  name: string;
  id: string;
  createdDate: string;
  orders: BriefcaseOrder[];
  userId: string;
};
