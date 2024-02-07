import { useEffect, useState } from "react";

import { OrderType } from "@/pages/briefcase/briefcase/modalCreateOrder/modalCreateOrder";
import { useGetCatalogQuery } from "@/services/catalog/catalog.services";
import { ProductType } from "@/services/catalog/catalog-servicesType";
import { v4 as uuidv4 } from "uuid";
type PropsType = {
  arrProductsForClient: OrderType[];
  setArrProductsForClient: (arr: OrderType[]) => void;
};
export const useFormOrderClient = ({
  arrProductsForClient,
  setArrProductsForClient,
}: PropsType) => {
  const [arrOptionsProduct, setArrOptionsProduct] = useState([]);
  const { data: catalog, isLoading } = useGetCatalogQuery({});
  const [idChoiceProduct, setIdChoiceProduct] = useState<string | undefined>(
    undefined,
  );
  const [comments, setComments] = useState("");
  const [valueWeightInput, setValueWeightInput] = useState("");

  const [valueWeightSelect, setValueWeightSelect] = useState("кг.");
  const addProductInBasket = () => {
    const product = catalog.find(
      (el: ProductType) => el.id === idChoiceProduct,
    );

    if (product) {
      const body: OrderType = {
        comments,
        name: product.name,
        positionId: uuidv4(),
        price: product.price,
        quantity: `${valueWeightInput}${valueWeightSelect}`,
      };

      setComments("");
      setValueWeightInput("");
      setArrProductsForClient([{ ...body }, ...arrProductsForClient]);
    }
  };

  useEffect(() => {
    if (!isLoading && catalog.length) {
      const options = catalog.map((el: { id: string; name: string }) => ({
        id: el.id,
        value: el.name,
      }));

      setArrOptionsProduct(options);
    }
  }, [catalog]);

  return {
    addProductInBasket,
    arrOptionsProduct,
    comments,
    idChoiceProduct,
    setComments,
    setIdChoiceProduct,
    setValueWeightInput,
    setValueWeightSelect,
    valueWeightInput,
    valueWeightSelect,
  };
};
