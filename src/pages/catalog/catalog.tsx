import { useState } from "react";
import { useForm } from "react-hook-form";

import { ControlledInput } from "@/components/controlled/controlledInput/controlledInput";
import { ControlledRadio } from "@/components/controlled/controlledRadio/controlledRadio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChickenIcon } from "@/components/ui/icons/chiken/chicken";
import { Pig } from "@/components/ui/icons/pig/pig";
import { TrashOutline } from "@/components/ui/icons/trash-outline/TrashOutline";
import Modal from "@/components/ui/modal/modal";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import { Typography } from "@/components/ui/typography";
import { ChangeStatus } from "@/pages/clients/client/controlClient/controlClient";
import {
  useCreateProductMutation,
  useGetCatalogQuery,
  useRemoveProductMutation,
} from "@/services/catalog/catalog.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import s from "./catalog.module.scss";

export const Catalog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [removeProduct] = useRemoveProductMutation();
  const { data, isLoading } = useGetCatalogQuery({});

  if (isLoading) {
    return <div>IsLoading</div>;
  }
  console.log(data);

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
        <div className={s.cards}>
          {!data.length && <div>Список пуст</div>}
          {data.map((el) => (
            <Card className={s.card} key={el.id}>
              <Typography className={s.nameProduct} variant={"h2"}>
                {el.name}
                <TrashOutline
                  className={s.removeIcon}
                  onClick={() => {
                    removeProduct({ id: el.id });
                  }}
                />
              </Typography>
              <div>
                <div className={s.titleBox}>
                  <ChickenIcon
                    className={s.icon}
                    color={el.type === "Сырьевой" ? "#ffc0c0" : "#ff9200"}
                    isReady={el.type !== "Сырьевой"}
                    width={34}
                  />
                </div>
                {el.view}
                <Typography variant={"overline"}>Цена - {el.price}</Typography>
              </div>
            </Card>
          ))}
        </div>
        <ModalCreateProduct isOpen={isOpen} onOpenWindow={setIsOpen} />
      </div>
    </div>
  );
};

////////////////////////Модальное окно для создания продукта/////////////////////////////////

const loginSchema = z.object({
  name: z
    .string()
    .min(3, "Минимум 3 символа")
    .max(3000, "Слишком большое название"),
  price: z.string().regex(/^\d+\.\d+$/, "Цена должна быть на примере - 11.0 "),
  reductionName: z.string().optional(),
  type: z.string(),
});

type ModalCreateProductProps = {
  isOpen: boolean;
  onOpenWindow: (open: boolean) => void;
};
type FormDataAddProduct = {
  name: string;
  price: string;
  reductionName: string;
  type: "Готовый" | "Сырьевой";
};
const ModalCreateProduct = ({
  isOpen,
  onOpenWindow,
}: ModalCreateProductProps) => {
  const [createProduct] = useCreateProductMutation();
  const [viewProduct, setViewProduct] = useState<string | undefined>("Птица");
  const { control, handleSubmit, reset } = useForm<FormDataAddProduct>({
    defaultValues: {
      name: "",
      price: "",
      reductionName: "",
      type: "Сырьевой",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const onSubmitHandler = async (dateForm: FormDataAddProduct) => {
    const body = {
      view: viewProduct,
      ...dateForm,
    };

    if (!dateForm.reductionName) {
      body.reductionName = dateForm.name;
    }
    createProduct(body);
    reset();
    onOpenWindow(false);
  };

  return (
    <Modal onOpenChange={onOpenWindow} open={isOpen} title={"Создать продукт"}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <ModalWithContent>
          <ControlledInput
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
          <ControlledInput
            className={s.input}
            control={control}
            label={"Цена"}
            name={"price"}
          />

          <div>
            <Typography variant={"body2"}>Тип продукта: </Typography>
            <ControlledRadio
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
          collection={[
            { location: "0", value: "Говядина" },
            { location: "1", value: "Свинина" },
            { location: "2", value: "Птица" },
          ]}
          status={viewProduct}
        />
        <ModalWithButton
          onClickSecondaryButton={() => onOpenWindow(false)}
          secondaryTitle={"Отменить"}
          titleButton={"Создать"}
        />
      </form>
    </Modal>
  );
};
