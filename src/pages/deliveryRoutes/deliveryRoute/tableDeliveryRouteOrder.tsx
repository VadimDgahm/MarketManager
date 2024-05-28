import {Table} from "@/components/ui/table/Table";
import {BriefcaseOrder} from "@/services/briefcase/briefcase.type";
import s from "@/pages/briefcase/briefcase/table/tableOrder/tableOrder.module.scss";
import {FullAddress} from "@/pages/utils/addresses";

type TableOrdersProps = {
  orders: BriefcaseOrder[];
};
export const TableDeliveryRouteOrder = ({orders}: TableOrdersProps) => {
  return (
    <Table.Root className={s.table} id={"orders-table"}>
      <Table.Head>
        <Table.Row>
          <Table.Cell variant={"head"}>№</Table.Cell>
          <Table.Cell variant={"head"}></Table.Cell>
          <Table.Cell variant={"head"}>Имя</Table.Cell>
          <Table.Cell variant={"head"}>Номер телефона</Table.Cell>
          <Table.Cell variant={"head"}>Адрес</Table.Cell>
          <Table.Cell variant={"head"}>Заказ</Table.Cell>
          <Table.Cell variant={"head"}>Маршрут</Table.Cell>
          <Table.Cell variant={"head"}>Время</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {orders.map((el, i) => (
          <TableRawOrder
            key={el.orderId}
            index={i}
            order={el}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

type TableRawOrderProps = {
  index: number;
  order: BriefcaseOrder;
};
const TableRawOrder = ({index, order}: TableRawOrderProps) => {
  const client = order.dataClient;

  return (
    <>
      <Table.Row className={s.table} key={order.orderId}>
        <Table.Cell>{++index}</Table.Cell>
        <Table.Cell>{client?.source?.substring(0, 4)}.</Table.Cell>
        <Table.Cell>{order.clientName}</Table.Cell>
        <Table.Cell>{client?.phones[0]?.tel}</Table.Cell>
        <Table.Cell>
          {client?.addresses
            .filter((address) => order.addressId === address.idAddress)
            .map((address) => (
              <FullAddress address={address}/>
            ))}
        </Table.Cell>
        <Table.Cell className={s.cellPosition}>
          {order.orderClient?.map((el) => (
            <span className={s.position} key={el.positionId}>
              {`${el.quantity}${el.reductionName}${
                el.comments && `(${el.comments})`
              }  _ _`}
            </span>
          ))}
        </Table.Cell>
        <Table.Cell>
          {`${order.deliveryRoute ? order.deliveryRoute.name : ""}`}
        </Table.Cell>
        <Table.Cell>
          <div>{`${
            order.dayDelivery !== "Неважно" || "" ? order.dayDelivery : ""
          }`}</div>
          <div>{`${order.timeDelivery ? order.timeDelivery : ""}`}</div>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell/>
        <Table.Cell/>
        <Table.Cell/>
        <Table.Cell/>
        <Table.Cell/>
        <Table.Cell/>
        <Table.Cell/>
        <Table.Cell/>
      </Table.Row>
    </>
  );
};
