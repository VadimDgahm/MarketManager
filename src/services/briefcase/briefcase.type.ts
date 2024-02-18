export type OrderType = {
  comments: string;
  name: string;
  positionId: string;
  price: string;
  quantity: string;
  reductionName: string;
};
export type BriefcaseOrder = {
  clientId: string;
  clientName: string;
  createdDate: string;
  orderClient: OrderType[];
  orderId: string;
};
