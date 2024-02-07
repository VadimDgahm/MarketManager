export type ProductTypeRequest = {
  name: string;
  price: string;
  type: "Готовый" | "Сырьевой";
  userId: string;
};

export type ProductType = {
  id: string;
} & ProductTypeRequest;
