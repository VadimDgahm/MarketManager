import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select/select";
import { useFormOrderClient } from "@/pages/briefcase/briefcase/modalCreateOrder/formOrderClient/useFormOrderClient";
import { OrderType } from "@/pages/briefcase/briefcase/modalCreateOrder/modalCreateOrder";

import s from "./formOrderClient.module.scss";

type FormOrderClientProps = {
  arrProductsForClient: OrderType[];
  setArrProductsForClient: (arr: OrderType[]) => void;
};
export const FormOrderClient = ({
  arrProductsForClient,
  setArrProductsForClient,
}: FormOrderClientProps) => {
  const {
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
  } = useFormOrderClient({
    arrProductsForClient,
    setArrProductsForClient,
  });

  return (
    <div>
      <Select
        className={s.selectorProduct}
        defaultValue={idChoiceProduct}
        onValueChange={(value) => setIdChoiceProduct(value)}
        options={arrOptionsProduct}
        title={"Выбрать продукт"}
      />
      <div className={s.weightBox}>
        <Input
          className={s.inputWeight}
          label={"Напишите вес"}
          onValueChange={(value) => setValueWeightInput(value)}
          type={"number"}
          value={valueWeightInput}
        />
        <Select
          className={s.selectWeight}
          defaultValue={valueWeightSelect}
          onValueChange={(value) => setValueWeightSelect(value)}
          options={["кг.", "шт."]}
        />
      </div>
      <Input
        label={"Комментрии"}
        onValueChange={(value) => setComments(value)}
        value={comments}
      />
      <Button
        disabled={!valueWeightInput && !idChoiceProduct}
        onClick={addProductInBasket}
        variant={"tertiary"}
      >
        Добавить продукт
      </Button>
    </div>
  );
};
