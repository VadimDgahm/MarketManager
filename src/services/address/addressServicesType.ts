type StatusClient = "loyal" | "new" | "uncertain";
export type PhoneClient = {
  idPhone: string;
  nameUserPhone: string;
  tel: string;
};
export type AddressClient = {
  buildingSection?: string; // корпус
  city?: string;
  code?: string;
  floor?: string; //  этаж
  idAddress: string;
  lobby?: string; //  подъзд
  numberApartment?: string;
  numberStreet?: string;
  street?: string;
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
