import { Card } from "@/components/ui/card";

import { Typography } from "@/components/ui/typography";
import { TrashOutline } from "@/components/ui/icons/trash-outline/TrashOutline";
import { ChickenIcon } from "@/components/ui/icons/chiken/chicken";
import s from "./cardProduct.module.scss";
import {
  useChangeProductMutation,
  useRemoveProductMutation,
} from "@/services/catalog/catalog.services";
import { EditOutline } from "@/components/ui/icons/edit-outline/EditOutline";
import { DeleteModal } from "@/components/ui/delete-modal/deleteModal";
import { useState } from "react";
import { ProductType } from "@/services/catalog/catalog-servicesType";
import { ModalProduct } from "@/pages/catalog/catalog";

type CardProductProps = {
  product: ProductType;
};
export const CardProduct = ({ product }: CardProductProps) => {
  const [removeProduct] = useRemoveProductMutation();
  const [changeProduct] = useChangeProductMutation();
  const [isOpenModalRemove, setIsOpenModalRemove] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  return (
    <Card className={s.card}>
      <Typography className={s.nameProduct} variant={"h2"}>
        {product.name}
        <EditOutline
          className={s.editIcon}
          onClick={() => setIsOpenModalEdit(true)}
        />
      </Typography>
      <ModalProduct
        isOpen={isOpenModalEdit}
        onOpenWindow={setIsOpenModalEdit}
        product={{ ...product }}
        resultFn={(body) => changeProduct({ id: product.id, body })}
      />
      <div className={s.contentProduct}>
        <div>
          <div className={s.titleBox}>
            <ChickenIcon
              color={product.type === "Сырьевой" ? "#ffc0c0" : "#ff9200"}
              isReady={product.type !== "Сырьевой"}
              width={34}
            />
          </div>
          {product.view} , {product.price} руб.
        </div>
        <TrashOutline
          className={s.removeIcon}
          onClick={() => {
            setIsOpenModalRemove(true);
          }}
        />
        <DeleteModal
          name={product.name}
          open={isOpenModalRemove}
          removeHandler={() => removeProduct({ id: product.id })}
          setOpen={setIsOpenModalRemove}
          title={"Удаление продукта"}
        />
      </div>
    </Card>
  );
};
