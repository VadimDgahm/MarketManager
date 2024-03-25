import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select/select";
import { useFormOrderClient } from "@/pages/briefcase/briefcase/modalCreateOrder/formOrderClient/useFormOrderClient";
import { OrderType } from "@/services/briefcase/briefcase.type";

import s from "./formOrderClient.module.scss";
import { SelectWithSearch } from "@/components/ui/selectWithSearch/selectWithSearch";

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
    errorForValueWeightInput,
  } = useFormOrderClient({
    arrProductsForClient,
    setArrProductsForClient,
  });
  console.log(arrOptionsProduct);
  return (
    <div>
      <SelectWithSearch
        onChange={(value) => setIdChoiceProduct(value.value)}
        title={"Выбрать продукт"}
        options={arrOptionsProduct}
      />

      <div className={s.weightBox}>
        <Input
          className={s.inputWeight}
          label={"Напишите вес"}
          onValueChange={(value) => setValueWeightInput(value)}
          type={"number"}
          value={valueWeightInput}
          errorMessage={errorForValueWeightInput ? "Заполните поле" : ""}
        />
        <Select
          className={s.selectWeight}
          defaultValue={valueWeightSelect}
          onValueChange={(value) => setValueWeightSelect(value)}
          options={[
            { id: "кг", value: "кг." },
            { id: "шт.", value: "шт." },
          ]}
        />
      </div>
      <Input
        label={"Комментрии"}
        onValueChange={(value) => setComments(value)}
        value={comments}
      />
      <Button
        // disabled={!valueWeightInput && !idChoiceProduct}
        disabled={false}
        onClick={addProductInBasket}
        variant={"tertiary"}
      >
        Добавить продукт
      </Button>
    </div>
  );
};
