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
export type BriefcaseType = {
  name: string;
  id: string;
  createdDate: string;
  orders: BriefcaseOrder[];
  userId: string;
};
