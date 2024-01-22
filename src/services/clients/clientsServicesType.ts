type StatusClient = "loyal" | "new" | "uncertain";
export type PhoneClient = {
  nameUserPhone: string;
  tel: string;
};
export type AddressClient = {
  buildingSection?: string; // корпус
  city: string;
  code?: string;
  floor?: string; //  этаж
  lobby?: string; //  подъзд
  numberApartment?: string;
  numberStreet: string;
  statusAddress?: "apartment" | "house" | "job";
  street: string;
};
type Source = "instagram" | "kufar" | "sarafan" | "telegram" | "viber";
export type ClientType = {
  addresses: AddressClient[];
  comments: string[];
  createdDate: string;
  dateLastOrder: string;
  id: string;
  name: string;
  phones: PhoneClient[];
  source: Source;
  status?: StatusClient;
};
