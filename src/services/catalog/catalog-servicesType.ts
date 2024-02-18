export type ProductTypeRequest = {
  name: string;
  price: string;
  type: "Готовый" | "Сырьевой";
  userId: string;
  view: "Говядина" | "Птица" | "Свинина";
};

export type ProductType = {
  id: string;
} & ProductTypeRequest;
