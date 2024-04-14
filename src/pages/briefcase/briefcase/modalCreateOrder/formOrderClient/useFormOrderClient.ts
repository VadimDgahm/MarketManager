import { useEffect, useState } from "react";

import { OrderType } from "@/services/briefcase/briefcase.type";
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
    undefined
  );
  const [errorForValueWeightInput, setErrorForValueWeightInput] =
    useState<boolean>(false);
  const [comments, setComments] = useState("");
  const [valueWeightInput, setValueWeightInput] = useState("");

  const [valueWeightSelect, setValueWeightSelect] = useState("кг.");
  const addProductInBasket = () => {
    const product = catalog.find(
      (el: ProductType) => el.id === idChoiceProduct
    );

    if (product) {
      if (!valueWeightInput) {
        setErrorForValueWeightInput(true);
      } else {
        const body: OrderType = {
          comments,
          name: product.name,
          positionId: uuidv4(),
          view: product.view,
          quantity: `${valueWeightInput}${valueWeightSelect}`,
          reductionName: product.reductionName,
        };
        setErrorForValueWeightInput(false);
        setComments("");
        setValueWeightInput("");
        setArrProductsForClient([{ ...body }, ...arrProductsForClient]);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && catalog.length) {
      const options = catalog.map((el: { id: string; name: string }) => ({
        value: el.id,
        label: el.name,
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
    errorForValueWeightInput,
  };
};
