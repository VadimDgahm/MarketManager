export type ProductTypeRequest = {
  name: string;
  price: number;
  purchasePrice?: number;
  type: "Готовый" | "Сырьевой";
  userId: string;
  reductionName: string;
  view: "Говядина" | "Птица" | "Свинина";
  sortValue: number;
};

export type ProductType = {
  id: string;
  _id: string;
} & ProductTypeRequest;
