import { Table } from "@/components/ui/table/Table";
import { BriefcaseOrder } from "@/services/briefcase/briefcase.type";
import {useNavigate, useParams} from "react-router-dom";
import {useGetInvoicesByIdQuery} from "@/services/invoices/invoices.services";
import React, {useState} from "react";
import s from './tableInvoiceDR.module.scss';
import {Button} from "@/components/ui/button";
import {InvoiceCreateModal} from "@/components/ui/invoiceCreateModal/invoiceCreateModal";
import {Typography} from "@/components/ui/typography";
import {Loader} from "@/components/ui/loader/loader";
import {FullAddress} from "@/pages/utils/addresses";
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {Basket} from "@/components/ui/icons/basket/basket";
import {toast} from "react-toastify";
import {ToastComponent} from "@/components/ui/ToastComponent/ToastComponent";

export const TableInvoiceDR = () => {
  const params = useParams();
  const {data, isLoading} = useGetInvoicesByIdQuery({id: params.id});

  if (isLoading) {
    return <Loader />;
  }

  async function copyInvoiceAsText(): Promise<void> {
    const copyText = data?.orders.map((order: BriefcaseOrder, index: number) => {
      const textAddress = getOrderAddresses(order);
      const textItem = getOrderClient(order);

      return  '№' + ++index + ' | ' + order.dataClient?.source?.substring(0, 4) + ' | 👤' + order.clientName +
        '\n☎️: `' + order.dataClient?.phones[0]?.tel + '`' +
        '\n🕘: ' + order.time +
        '\n🏠: `' + textAddress + '`' +
        '\n🥩: ' + textItem +
        '\n💰: ' + order.finalTotalAmount + ' руб.';
    });

    const title = '**Счет маршрута: ' + data?.name + '**\n**Общая сумма маршрута: ' + getDrTotalAmount() + ' руб.**\n\n\n';

    await navigator.clipboard.writeText(title + copyText.join('\n\n') + '\n\n\n' + title);

    toast.success("Счет скопирован как текст!");
  }

  async function copyText(e:  React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>): Promise<void> {
    // @ts-ignore
    const text = e.target.innerText;

    await navigator.clipboard.writeText(text);

    toast.success("Скопировано: " + text);
  }

  function getDrTotalAmount () {
    return data?.drTotalAmount ? data.drTotalAmount.toFixed(2) : ''
  }

  return (
    <>
      <ToastComponent/>
      <Typography variant={"h1"}>Счет маршрута: {data?.name}</Typography>
      <Typography variant={"h1"}>Общая сумма маршрута: <span style={{color:'#2f68cc'}}>{getDrTotalAmount()} руб.</span></Typography>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className={s.btnDownload}
        table="invoice-orders-table"
        filename={`Маршрут: ${data?.name}`}
        sheet="лист1"
        buttonText="Скачать как XLS"
      />
      <Button variant={"link"} onClick={copyInvoiceAsText}>Скопировать как текст</Button>
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
              copyText={copyText}
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
  copyText: (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => Promise<void>;
};
const TableRawOrder = ({ index, order, copyText }: TableRawOrderProps) => {
  const client = order.dataClient;
  const [isOpenInvoice, setOpenInvoice] = useState(false);
  const navigate = useNavigate();
  let color = '';

  if (order.markOrder) {
    color = 'var(--color-danger-300)';
  } else {
    color = order?.invoiceOrderItems && order?.invoiceOrderItems.length === order.orderClient.length ? 'var(--color-success-900)' : 'var(--color-accent-700)';
  }

  return (
    <>
      <Table.Row className={s.table} key={order.orderId} style={{color:color}}>
        <Table.Cell>{++index}</Table.Cell>
        <Table.Cell>{client?.source?.substring(0, 4)}.</Table.Cell>
        <Table.Cell className={s.cellName} onClick={copyText}>{order.clientName}</Table.Cell>
        <Table.Cell onClick={copyText}>{client?.phones[0]?.tel}</Table.Cell>
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
          {order.finalTotalAmount ? <Button variant={"link"} style={{color:color}} onClick={() => {
            navigate(`/invoices/receipt/${order.briefcaseId}/${order.orderId}`)}}>{order.finalTotalAmount}</Button> : "---"
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

function getOrderAddresses(order: BriefcaseOrder) {
  const address =  order.dataClient?.addresses
    .filter((address) => order.addressId === address.idAddress)[0];

  return [
    address.city && address.city + ",",
    address.street && address.street,
    address.numberStreet && `д.${address.numberStreet}`,
    address.buildingSection && `корпус ${address.buildingSection}`,
    address.numberApartment && `кв.${address.numberApartment}`,
    address.lobby && `под.${address.lobby}`,
    address.floor && `этаж ${address.floor}`,
    address.code && `код ${address.code}`
  ].join(' ');
}

function getOrderClient(order: BriefcaseOrder) {
  return order.orderClient?.map((el) =>
    `${el.quantity}${el.reductionName}${
      el.comments && `(${el.comments})`
    }  _ _`
  );
}