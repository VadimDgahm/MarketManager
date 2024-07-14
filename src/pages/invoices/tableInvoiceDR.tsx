import { Table } from "@/components/ui/table/Table";
import { BriefcaseOrder } from "@/services/briefcase/briefcase.type";
import {useNavigate, useParams} from "react-router-dom";
import {useGetInvoicesByIdQuery} from "@/services/invoices/invoices.services";
import {useState} from "react";
import s from "@/pages/briefcase/briefcase/table/tableOrder/tableOrder.module.scss";
import {Button} from "@/components/ui/button";
import {InvoiceCreateModal} from "@/components/ui/invoiceCreateModal/invoiceCreateModal";
import {Typography} from "@/components/ui/typography";

export const TableInvoiceDR = () => {
  const params = useParams();
  const {data} = useGetInvoicesByIdQuery({id: params.id});

  return (
    <>
      <Typography variant={"h1"}>Счет маршрута: {data?.name}</Typography>
      <Typography variant={"h1"}>Общая сумма маршрута: <span style={{color:'#2f68cc'}}>{data?.drTotalAmount} руб.</span></Typography>

      <Table.Root className={s.table}  id={"invoice-orders-table"}>
        <Table.Head>
          <Table.Row>
            <Table.Cell variant={"head"}>№</Table.Cell>
            <Table.Cell variant={"head"}></Table.Cell>
            <Table.Cell variant={"head"}>Имя</Table.Cell>
            <Table.Cell variant={"head"}>Номер телефона</Table.Cell>
            <Table.Cell variant={"head"}>Заказ</Table.Cell>
            <Table.Cell variant={"head"}>Сумма, руб.</Table.Cell>
            <Table.Cell variant={"head"}>Чек</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {
            // @ts-ignore
            data?.orders.map((el, i) => (
            <TableRawOrder
              key={el.orderId}
              index={i}
              order={el}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

type TableRawOrderProps = {
  index: number;
  order: BriefcaseOrder;
};
const TableRawOrder = ({ index, order }: TableRawOrderProps) => {
  const client = order.dataClient;
  const [isOpenInvoice, setOpenInvoice] = useState(false);
  const navigate = useNavigate();


  return (
    <>
      <Table.Row className={s.table} key={order.orderId}>
        <Table.Cell>{++index}</Table.Cell>
        <Table.Cell>{client?.source?.substring(0, 4)}.</Table.Cell>
        <Table.Cell>{order.clientName}</Table.Cell>
        <Table.Cell>{client?.phones[0]?.tel}</Table.Cell>
        <Table.Cell className={s.cellPosition}>
          <Button variant={"link"} onClick={() => setOpenInvoice(true)}>
            {order.orderClient?.map((el) => (
              <span className={s.position} key={el.positionId}>
                {`${el.quantity}${el.reductionName}${
                  el.comments && `(${el.comments})`
                }  _ _`}
              </span>
            ))}
          </Button>
          <InvoiceCreateModal open={isOpenInvoice} title={"Формирование счета"} setOpen={setOpenInvoice} order={order}/>
        </Table.Cell>
        <Table.Cell>{order.finalTotalAmount ?? "не сформ."}</Table.Cell>
        <Table.Cell>
          {order.finalTotalAmount ? <Button variant={"link"} onClick={() => {
            navigate(`/invoices/receipt/${order.briefcaseId}/${order.orderId}`)}}>Чек</Button> : ''}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
      </Table.Row>
    </>
  );
};