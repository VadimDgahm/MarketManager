export type ProductTypeRequest = {
  name: string;
  type: "Готовый" | "Сырьевой";
  userId: string;
  reductionName: string;
  view: "Говядина" | "Птица" | "Свинина";
};

export type ProductType = {
  id: string;
  _id: string;
} & ProductTypeRequest;
