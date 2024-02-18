import { Table } from "@/components/ui/table/Table";
import { BriefcaseOrder } from "@/services/briefcase/briefcase.type";
import { useGetClientByIdQuery } from "@/services/clients/clients.services";

import s from "./tableOrder.module.scss";

type TableOrdersProps = {
  orders: BriefcaseOrder[];
};
export const TableOrders = ({ orders }: TableOrdersProps) => {
  console.log(orders);

  return (
    <Table.Root className={s.table}>
      <Table.Head>
        <Table.Row>
          <Table.Cell variant={"head"}>№</Table.Cell>
          <Table.Cell variant={"head"}>Имя</Table.Cell>
          <Table.Cell variant={"head"}>Номер телефона</Table.Cell>
          <Table.Cell variant={"head"}>Адрес</Table.Cell>
          <Table.Cell variant={"head"}>Заказ</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {orders.map((el, i) => (
          <TableRawOrder index={i} order={el} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

type TableRawOrderProps = {
  index: number;
  order: BriefcaseOrder;
};
const TableRawOrder = ({ index, order }: TableRawOrderProps) => {
  const { data: client, isLoading } = useGetClientByIdQuery({
    id: order.clientId,
  });

  if (isLoading) {
    return <div>Загрузка</div>;
  }

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
          <span>{`${el.name} ${el.quantity} ${
            el.comments && `(${el.comments})`
          }`}</span>
        ))}
      </Table.Cell>
    </Table.Row>
  );
};
