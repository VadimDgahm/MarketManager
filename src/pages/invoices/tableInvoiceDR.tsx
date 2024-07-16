import { Table } from "@/components/ui/table/Table";
import { BriefcaseOrder } from "@/services/briefcase/briefcase.type";
import {useNavigate, useParams} from "react-router-dom";
import {useGetInvoicesByIdQuery} from "@/services/invoices/invoices.services";
import {useState} from "react";
import s from './tableInvoiceDR.module.scss';
import {Button} from "@/components/ui/button";
import {InvoiceCreateModal} from "@/components/ui/invoiceCreateModal/invoiceCreateModal";
import {Typography} from "@/components/ui/typography";
import {Loader} from "@/components/ui/loader/loader";
import {FullAddress} from "@/pages/utils/addresses";
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {Basket} from "@/components/ui/icons/basket/basket";

export const TableInvoiceDR = () => {
  const params = useParams();
  const {data, isLoading} = useGetInvoicesByIdQuery({id: params.id});

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Typography variant={"h1"}>Счет маршрута: {data?.name}</Typography>
      <Typography variant={"h1"}>Общая сумма маршрута: <span style={{color:'#2f68cc'}}>{data?.drTotalAmount.toFixed(2)} руб.</span></Typography>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className={s.btnDownload}
        table="invoice-orders-table"
        filename={`Маршрут: ${data?.name}`}
        sheet="лист1"
        buttonText="Скачать как XLS"
      />

      <Table.Root className={s.table}  id={"invoice-orders-table"}>
        <Table.Head>
          <Table.Row>
            <Table.Cell variant={"head"}>№</Table.Cell>
            <Table.Cell variant={"head"}></Table.Cell>
            <Table.Cell variant={"head"}>Имя</Table.Cell>
            <Table.Cell variant={"head"}>Номер телефона</Table.Cell>
            <Table.Cell className={s.cellHide} variant={"head"}>Время</Table.Cell>
            <Table.Cell className={s.cellHide} variant={"head"}>Адрес</Table.Cell>
            <Table.Cell variant={"head"}>Заказ</Table.Cell>
            <Table.Cell variant={"head"}>Сумма, руб.</Table.Cell>
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

  const color = order.invoiceOrderItems ? 'var(--color-success-900)' : 'var(--color-accent-700)';

  return (
    <>
      <Table.Row className={s.table} key={order.orderId} style={{color:color}}>
        <Table.Cell>{++index}</Table.Cell>
        <Table.Cell>{client?.source?.substring(0, 4)}.</Table.Cell>
        <Table.Cell>{order.clientName}</Table.Cell>
        <Table.Cell>{client?.phones[0]?.tel}</Table.Cell>
        <Table.Cell className={s.cellHide}>{order.time}</Table.Cell>
        <Table.Cell className={s.cellHide}>
          {order.dataClient?.addresses
            .filter((address) => order.addressId === address.idAddress)
            .map((address, index) => (
              <FullAddress address={address} key={'adr' + index}/>
          ))}
        </Table.Cell>
        <Table.Cell className={s.cellPosition}>
          <Button variant={"link"} className={s.btnOrder} style={{color:color}} onClick={() => setOpenInvoice(true)}>
            <Basket className={s.iconBasket} color={color}></Basket>
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
        <Table.Cell>
          {order.finalTotalAmount ? <Button variant={"link"}  style={{color:color}} onClick={() => {
            navigate(`/invoices/receipt/${order.briefcaseId}/${order.orderId}`)}}>{order.finalTotalAmount}</Button> : "не сформ."
          }
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