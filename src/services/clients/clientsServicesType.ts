import { BriefcaseOrder } from "@/services/briefcase/briefcase.type";

export type PhoneClient = {
  idPhone: string;
  nameUserPhone: string;
  tel: string;
};
export type AddressClient = {
  buildingSection?: null | string; // корпус
  city?: null | string;
  code?: null | string;
  floor?: null | string; //  этаж
  idAddress: string;
  lobby?: null | string; //  подъзд
  numberApartment?: null | string;
  numberStreet?: null | string;
  statusAddress?: "apartment" | "house" | "job" | null;
  street?: null | string;
};
export type ClientType = {
  addresses: [] | AddressClient[];
  comments: string[];
  createdDate: string;
  order: BriefcaseOrder[];
  id: string;
  name: string;
  phones: PhoneClient[];
  source: string;
  status: string;
};
export type CreateClientBody = Omit<
  ClientType,
  "createdDate" | "order" | "id" | "status" | "addresses" | "source"
>;
export type ClientTypeFilter = Partial<
  Pick<ClientType, "comments" | "name" | "source" | "status">
>;
