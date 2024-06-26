import { useState } from "react";
import { useForm } from "react-hook-form";

import { ControlledInput } from "@/components/controlled/controlledInput/controlledInput";
import { ControlledRadio } from "@/components/controlled/controlledRadio/controlledRadio";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal/modal";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import { Typography } from "@/components/ui/typography";
import { ChangeStatus } from "@/pages/clients/client/controlClient/controlClient";
import {
  useCreateProductMutation,
  useGetCatalogQuery,
} from "@/services/catalog/catalog.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import s from "./catalog.module.scss";
import { CardProduct } from "@/pages/catalog/cardProduct/cardProduct";
import { ProductType } from "@/services/catalog/catalog-servicesType";

export const CHICKEN_VIEW = "Птица";
export const BEEF_VIEW = "Говядина";
export const PORK_VIEW = "Свинина";
export const RABBIT_VIEW = "Кролик";
export const TURKEY_VIEW = "Индейка";
export type TView = "Птица" | "Говядина" | "Свинина" | "Кролик" | "Индейка";
export const optionsView = [
  { location: "0", value: BEEF_VIEW },
  { location: "1", value: PORK_VIEW },
  { location: "2", value: CHICKEN_VIEW },
  { location: "3", value: RABBIT_VIEW },
  { location: "5", value: TURKEY_VIEW },
];
export const Catalog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterView, setFilterView] = useState<string>(CHICKEN_VIEW);
  const [createProduct] = useCreateProductMutation();
  const { data, isLoading } = useGetCatalogQuery({});
  if (isLoading) {
    return <div>IsLoading</div>;
  }
  return (
    <div className={s.catalogContainer}>
      <Typography className={s.titlePage} variant={"large"}>
        Каталог
      </Typography>
      <div>
        <div className={s.boxButton}>
          <Button
            className={s.buttonAddProduct}
            onClick={() => setIsOpen(true)}
            variant={"primary"}
          >
            Добавить продукт
          </Button>
        </div>
        <div>
          <ChangeStatus
            changeStatus={(value) => setFilterView(value)}
            collection={optionsView}
            status={filterView}
          />
        </div>
        <div className={s.cards}>
          {!data.length && <div>Список пуст</div>}
          {data
            .filter((product: ProductType) => product.view === filterView)
            .map((product: ProductType) => (
              <CardProduct key={product.id} product={product} />
            ))}
        </div>
        <ModalProduct
          resultFn={(body) => createProduct(body)}
          isOpen={isOpen}
          onOpenWindow={setIsOpen}
        />
      </div>
    </div>
  );
};

////////////////////////Модальное окно для создания продукта/////////////////////////////////

export const loginSchemaProduct = z.object({
  name: z
    .string()
    .min(3, "Минимум 3 символа")
    .max(3000, "Слишком большое название"),
  reductionName: z.string().optional(),
  type: z.string(),
});

export type ModalProductProps = {
  isOpen: boolean;
  onOpenWindow: (open: boolean) => void;
  product?: ProductType;
  resultFn: (body: any) => void;
};
export type FormDataProduct = {
  name: string;
  reductionName: string;
  type: "Готовый" | "Сырьевой";
};
export const ModalProduct = ({
  isOpen,
  onOpenWindow,
  product,
  resultFn,
}: ModalProductProps) => {
  const [viewProduct, setViewProduct] = useState<string | undefined>(
    product?.view
  );
  const { control, handleSubmit, reset } = useForm<FormDataProduct>({
    defaultValues: {
      name: product?.name || "",
      reductionName: product?.reductionName || "",
      type: product?.type || "Сырьевой",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchemaProduct),
  });
  const onSubmitHandler = async (dateForm: FormDataProduct) => {
    const body = {
      view: viewProduct,
      ...dateForm,
    };

    if (!dateForm.reductionName) {
      body.reductionName = dateForm.name;
    }
    resultFn(body);
    onOpenWindow(false);
    product ? reset(dateForm) : reset();
  };

  return (
    <Modal
      className={s.form}
      onOpenChange={onOpenWindow}
      open={isOpen}
      title={product ? "Редактировать" : "Создать продукт"}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <ModalWithContent>
          <ControlledInput
            defaultValue={"jjjjjjjjjjj"}
            className={s.input}
            control={control}
            label={"Название"}
            name={"name"}
          />
          <ControlledInput
            className={s.input}
            control={control}
            label={"Сокращение"}
            name={"reductionName"}
          />

          <div>
            <Typography variant={"body2"}>Тип продукта: </Typography>
            <ControlledRadio
              defaultValue={product?.type || undefined}
              control={control}
              name={"type"}
              options={[
                { grade: 0, value: "Готовый" },
                { grade: 1, value: "Сырьевой" },
              ]}
            />
          </div>
        </ModalWithContent>
        <ChangeStatus
          changeStatus={(value) => setViewProduct(value)}
          collection={optionsView}
          status={viewProduct}
        />
        <ModalWithButton
          onClickSecondaryButton={() => onOpenWindow(false)}
          secondaryTitle={"Отменить"}
          titleButton={product ? "Изменить" : "Создать"}
        />
      </form>
    </Modal>
  );
};
