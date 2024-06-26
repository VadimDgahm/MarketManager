import {BriefcaseOrder} from "@/services/briefcase/briefcase.type";

export type DeliveryRouteType = {
  _id?: string,
  name: string,
  createdDate: string
}

export type DeliveryRouteResponseType = {
  _id: string,
  name: string,
  createdDate: string,
  briefcases: BriefcasesDeliveryRouteType[],
  orders:BriefcaseOrder[]
  count: number,
}

export type BriefcasesDeliveryRouteType = {
  id: string,
  orderIds: {orderId: string, sort: number, time: string}[]
}