import s from './lavka-receipt.module.scss';
import logo from '../../../img/lavka-logo.jpg';
import {Table} from "@/components/ui/table/Table";
import {BriefcaseOrder} from "@/services/briefcase/briefcase.type";

export const LavkaReceipt = ({order}: {order: BriefcaseOrder}) => {

  const items = order.invoiceOrderItems?.filter(i =>  i.typeReceipt !== 'СЗ');
  let sumIP = items?.reduce((sum, value) => {
    return value.amount + sum;
  }, 0) ?? 0;
  sumIP += order.priceDelivery ?? 0;
  let finalAmountSZ = order.discount ? sumIP * ((100 - order.discount) /100) : sumIP;


  return (
    <>
      <div className={s.body}>
        <header className={s.header}>
          <img src={logo} width="230px" alt={"logo"}/>
        </header>
        <main>
          <h3 className={s.pageTitle}>Ваш заказ</h3>
          <div className={s.order}>
            <Table.Root className={s.tableOrder} id={"receipt"}>
              <Table.Head>
                <Table.Row>
                  <Table.Cell variant={"head"}>№</Table.Cell>
                  <Table.Cell variant={"head"}>Позиция</Table.Cell>
                  <Table.Cell variant={"head"}>Цена</Table.Cell>
                  <Table.Cell variant={"head"}>Вес</Table.Cell>
                  <Table.Cell variant={"head"}>Сумма</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body className={s.tbody}>
                {
                  items?.map((item, index) => (
                      <Table.Row className={s.record} key={index}>
                        <Table.Cell className={s.tdText}>{index + 1}</Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell
                          className={s.tdText}>{item.productPrice.toFixed(2) + ' руб./' + item.units}</Table.Cell>
                        <Table.Cell className={s.tdText}>{item.weight.toFixed(2) + ' ' + item.units}</Table.Cell>
                        <Table.Cell className={s.tdText}>{
                          item.isGift ? 'Подарок' : item.amount.toFixed(2) + ' руб.'
                        }</Table.Cell>
                      </Table.Row>
                    )
                  )
                }

                <Table.Row className={s.record}>
                  <Table.Cell className={s.tdText}>{items?.length ? items?.length + 1 : ''}</Table.Cell>
                  <Table.Cell>Доставка</Table.Cell>
                  <Table.Cell className={s.tdText}>{order.priceDelivery?.toFixed(2)} руб.</Table.Cell>
                  <Table.Cell className={s.tdText}>1.00</Table.Cell>
                  <Table.Cell className={s.tdText}>{order.priceDelivery?.toFixed(2)} руб.</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
            {
              order.discount ? (
                <>
                  <p className={s.resultPrice}>Общая сумма заказа: <b>{sumIP} руб.</b></p>
                  <p className={s.resultPrice}>Скидка: <b>{order.discount}%</b></p>
                  <p className={s.resultPrice}>К оплате: <b>{finalAmountSZ?.toFixed(2)} руб.</b>
                  </p>
                </>
              ) : (
                <>
                  <p className={s.resultPrice}>Общая сумма заказа: <b>{finalAmountSZ?.toFixed(2)} руб.</b></p>
                </>)
            }


            <h3 className={s.thankText}>Спасибо, что выбираете нас!</h3>
          </div>
        </main>
      </div>
    </>
  );
};
