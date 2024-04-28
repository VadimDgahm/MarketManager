import { Basket } from "@/components/ui/icons/basket/basket";
import { TrashOutline } from "@/components/ui/icons/trash-outline/TrashOutline";
import { Table } from "@/components/ui/table/Table";
import { Typography } from "@/components/ui/typography";
import { OrderType } from "@/services/briefcase/briefcase.type";

import s from "./basket.module.scss";

type BasketClientType = {
  arrProductsForClient: OrderType[];
  setArrProductsForClient: (arr: OrderType[]) => void;
};
export const BasketClient = ({
  arrProductsForClient,
  setArrProductsForClient,
}: BasketClientType) => {
  const removePosition = (positionId: string) => {
    if (positionId) {
      const arr = arrProductsForClient.filter(
        (el) => el.positionId !== positionId
      );

      setArrProductsForClient(arr);
    }
  };

  return (
    <div className={s.basket}>
      <div className={s.titleBasket}>
        <Basket className={s.basketIcon} />
        <Typography variant={"body2"}>Корзина</Typography>{" "}
      </div>
      <div>
        {arrProductsForClient.length ? (
          <Table.Root className={s.tableProductsForClient}>
            <Table.Head>
              <Table.Row>
                <Table.Cell variant={"head"}>Наименование</Table.Cell>
                <Table.Cell variant={"head"}>Кол-во</Table.Cell>
                <Table.Cell variant={"head"}></Table.Cell>
                <Table.Cell variant={"head"}></Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {arrProductsForClient.map((el, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{el.name}</Table.Cell>
                  <Table.Cell>{el.quantity}</Table.Cell>
                  <Table.Cell>{el.comments}</Table.Cell>
                  <Table.Cell>
                    <TrashOutline
                      className={s.removeIcon}
                      onClick={() => removePosition(el.positionId)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        ) : (
          <div>Корзина пуста</div>
        )}
      </div>
    </div>
  );
};
