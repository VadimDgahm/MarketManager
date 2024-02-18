type StatusClient = "loyal" | "new" | "uncertain";
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
  dateLastOrder: string;
  id: string;
  name: string;
  phones: PhoneClient[];
  source: string;
  status?: StatusClient;
};
export type CreateClientBody = Omit<
  ClientType,
  "createdDate" | "dateLastOrder" | "id" | "status"
>;
export type ClientTypeFilter = Partial<
  Pick<ClientType, "comments" | "name" | "source" | "status">
>;
