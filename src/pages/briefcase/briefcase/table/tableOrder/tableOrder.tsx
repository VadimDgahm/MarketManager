import { Table } from "@/components/ui/table/Table";
import { BriefcaseOrder } from "@/services/briefcase/briefcase.type";
import { useGetClientByIdQuery } from "@/services/clients/clients.services";

import s from "./tableOrder.module.scss";
import { CellVariant } from "@/components/ui/table/TableCellVariant/TableCellVariant";
import { DeleteModal } from "@/components/ui/delete-modal/deleteModal";
import { useState } from "react";
import { useRemoveOrderMutation } from "@/services/briefcase/briefcase.services";

type TableOrdersProps = {
  orders: BriefcaseOrder[];
  idBriefcase: string | undefined;
};
export const TableOrders = ({ orders, idBriefcase }: TableOrdersProps) => {
  return (
    <Table.Root className={s.table}>
      <Table.Head>
        <Table.Row>
          <Table.Cell variant={"head"}>№</Table.Cell>
          <Table.Cell variant={"head"}>Имя</Table.Cell>
          <Table.Cell variant={"head"}>Номер телефона</Table.Cell>
          <Table.Cell variant={"head"}>Адрес</Table.Cell>
          <Table.Cell variant={"head"}>Заказ</Table.Cell>
          <Table.Cell variant={"head"}></Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {orders.map((el, i) => (
          <TableRawOrder
            key={el.orderId}
            index={i}
            order={el}
            idBriefcase={idBriefcase}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

type TableRawOrderProps = {
  index: number;
  order: BriefcaseOrder;
  idBriefcase: string | undefined;
};
const TableRawOrder = ({ index, order, idBriefcase }: TableRawOrderProps) => {
  const { data: client } = useGetClientByIdQuery({
    id: order.clientId,
  });
  const [removeOrder] = useRemoveOrderMutation();
  const [isOpenModal, setIsOpenModal] = useState<boolean[]>([]);

  const removeOrderHandler = (orderId: string, index: number) => {
    removeOrder({ orderId, id: idBriefcase });
    setIsOpenModal((prev) => {
      const updatedModalState = [...prev];

      updatedModalState[index] = false;

      return updatedModalState;
    });
  };

  return (
    <Table.Row key={order.orderId}>
      <Table.Cell>{++index}</Table.Cell>
      <Table.Cell>{order.clientName}</Table.Cell>
      <Table.Cell>{client?.phones[0].tel}</Table.Cell>
      <Table.Cell>
        {client?.addresses.length
          ? `${client?.addresses[0]?.street} ${client?.addresses[0]?.numberStreet}`
          : "нет данных"}
      </Table.Cell>
      <Table.Cell>
        {order.orderClient.map((el) => (
          <span key={el.positionId}>{`${el.name} ${el.quantity} ${
            el.comments && `(${el.comments})`
          }`}</span>
        ))}
      </Table.Cell>
      <Table.Cell>
        <CellVariant.EditAndTrash
          onClickEdit={() => {}}
          onClickTrash={() => {
            setIsOpenModal((prev) => {
              const updatedModalState = [...prev];

              updatedModalState[index] = true;

              return updatedModalState;
            });
          }}
        />
        <DeleteModal
          name={`заказ - ${order.clientName}`}
          open={isOpenModal[index]}
          removeHandler={function () {
            removeOrderHandler(order.orderId, index);
          }}
          setOpen={(isOpen) =>
            setIsOpenModal((prev) => {
              const updatedModalState = [...prev];

              updatedModalState[index] = isOpen;

              return updatedModalState;
            })
          }
          title={"Удаление заказа"}
        />
      </Table.Cell>
    </Table.Row>
  );
};
