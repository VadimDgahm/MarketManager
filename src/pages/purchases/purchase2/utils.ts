import { ValuesPosition } from "@/components/ui/tabSwitcher";
import { viewProduct } from "@/pages/catalog/catalog";

const SHOW_ALL = "Показать всё";

const showAllValuePosition: ValuesPosition<string> = {
  location: SHOW_ALL,
  value: SHOW_ALL,
};

const KG_REGEX = /\b\d+(?:\.\d+)?\s*кг\./g;
const ITEM_REGEX = /\b\d+(?:\.\d+)?\s*шт\./g;

const arrViewProductsPosition: ValuesPosition<string>[] = [
  {
    location: viewProduct.BEEF_VIEW,
    value: viewProduct.BEEF_VIEW,
  },
  {
    location: viewProduct.PORK_VIEW,
    value: viewProduct.PORK_VIEW,
  },
  {
    location: viewProduct.CHICKEN_VIEW,
    value: viewProduct.CHICKEN_VIEW,
  },
  {
    location: viewProduct.TURKEY_VIEW,
    value: viewProduct.TURKEY_VIEW,
  },
];

function extractNumbers(sentence: string) {
  const regex = /\b\d+(?:\.\d+)?\b/g;
  const matches = sentence.match(regex);
  if (matches) {
    return matches.map(Number);
  } else {
    return [];
  }
}

const calculateTotalSum = (arrQuantities: string[]) => {
  const result = { quantity: 0, totalWeight: 0 };
  arrQuantities.forEach((el) => {
    const number = extractNumbers(el);
    if (el.includes("кг.")) {
      result.totalWeight += +number[0];
      return;
    }
    if (el.includes("шт.")) {
      result.quantity += +number[0];
      return;
    }
  });

  return `${result.quantity}шт. ${result.totalWeight.toFixed(2)}кг.`;
};

export {
  SHOW_ALL,
  arrViewProductsPosition,
  showAllValuePosition,
  calculateTotalSum,
};
