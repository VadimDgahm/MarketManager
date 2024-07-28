import Modal from "@/components/ui/modal/modal";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import {BriefcaseOrder} from "@/services/briefcase/briefcase.type";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import s from './invoiceCreateModal.module.scss';
import {useCreateInvoiceMutation} from "@/services/invoices/invoices.services";
import React, {useState} from "react";

type PropsType = {
  open: boolean;
  title: string;
  setOpen: (isOpen: boolean) => void;
  order: BriefcaseOrder;
};

type OrderItems = {
  productId: string;
  positionId: string;
  weight: number;
  units:string;
  comments: string;
  isGift: boolean;
}

type Invoice = {
  orderId: string;
  briefcaseId: string;
  deliveryRouteId: string;
  orderItems: OrderItems[];
  discount: number;
  priceDelivery: number;
  markOrder: boolean;
}

export const InvoiceCreateModal = ({
                                         open,
                                         setOpen,
                                         title,
                                          order
                                       }: PropsType) => {
  const orderItems = order?.invoiceOrderItems && order?.invoiceOrderItems.length === order.orderClient.length ?
      order?.invoiceOrderItems : order.orderClient;

  const [createInvoice] = useCreateInvoiceMutation();
  const [discount, setDiscount] = useState<number>(0);
  const [priceDelivery, setPriceDelivery] = useState<number>(2.5);
  const [isMarkOrder, setIsMarkOrder] = useState<boolean>(order.markOrder ?? false);

  function changeDiscount(e: React.ChangeEvent<HTMLInputElement>) {
    setDiscount(+e.target.value);
  }

  function changePriceDelivery(e: React.ChangeEvent<HTMLInputElement>) {
    setPriceDelivery(+e.target.value);
  }

  return (
    <Modal onOpenChange={setOpen} open={open} title={title + ' - ' + order.clientName}>
      <ModalWithContent className={s.modalContent}>
        <form className={s.form} id={"invoice-form"}>
          {orderItems.map((item, index) => {
            return (
              <div className={s.inputContainer} key={index + item.productId}>
                <label className={s.label}>{item.name}</label>
                <div className={s.control}>
                  <input id={"in" + index} className={s.input} name={item.name} data-positionid={item.positionId} data-comments={item.comments} defaultValue={
                    //@ts-ignore
                    item.weight
                  } step="0.01" data-productid={item.productId}  type={"number"} data-gift={item.isGift}  min={0} required={true}/>
                  <label>{order.orderClient[index].quantity}</label>
                  <div className={s.giftContainer}>
                      <svg data-id={"in" + index}  onClick={(e) => {
                        // @ts-ignore
                        const input = document.getElementById(e.target.dataset.id);
                        let color = "var(--color-danger-500)";
                        let isGift = "true";

                        // @ts-ignore
                        if(input.dataset.gift === "true") {
                          color = "var(--color-accent-700)";
                          isGift = "false";
                        }

                        // @ts-ignore
                        input.dataset.gift = isGift;
                        // @ts-ignore
                        e.currentTarget.querySelector('path').style.fill = color;
                      }}>
                        <path data-id={"in" + index} fill={item.isGift ? "var(--color-danger-500)": "var(--color-accent-700)"} d="M19.5 7.75H18.1C18.5 7.27 18.75 6.67 18.75 6C18.75 4.48 17.52 3.25 16 3.25C14.32 3.25 12.84 4.14 12 5.46C11.16 4.14 9.68 3.25 8 3.25C6.48 3.25 5.25 4.48 5.25 6C5.25 6.67 5.5 7.27 5.9 7.75H4.5C3.81 7.75 3.25 8.31 3.25 9V11.5C3.25 12.1 3.68 12.58 4.25 12.7V19.5C4.25 20.19 4.81 20.75 5.5 20.75H18.5C19.19 20.75 19.75 20.19 19.75 19.5V12.7C20.32 12.58 20.75 12.1 20.75 11.5V9C20.75 8.31 20.19 7.75 19.5 7.75ZM19.25 11.25H12.75V9.25H19.25V11.25ZM16 4.75C16.69 4.75 17.25 5.31 17.25 6C17.25 6.69 16.69 7.25 16 7.25H12.84C13.18 5.82 14.47 4.75 16 4.75ZM8 4.75C9.53 4.75 10.82 5.82 11.16 7.25H8C7.31 7.25 6.75 6.69 6.75 6C6.75 5.31 7.31 4.75 8 4.75ZM4.75 9.25H11.25V11.25H4.75V9.25ZM5.75 12.75H11.25V19.25H5.75V12.75ZM18.25 19.25H12.75V12.75H18.25V19.25Z"></path>
                      </svg>
                    </div>
                </div>
                <label className={s.comments}>{item.comments}</label>
              </div>
            )
          })}
        </form>

        <label className={s.label}>Доставка</label>
        <input className={s.input} type={"number"}  min={0} step="0.01" value={priceDelivery} onChange={changePriceDelivery}/>
      </ModalWithContent>

      <div className={s.checkbox}>
        <input id="markOrder" checked={isMarkOrder} className={s.checkbox__input} type="checkbox" onChange={() => setIsMarkOrder(!isMarkOrder)}/>
        <label htmlFor="markOrder" className={s.checkbox__label}>
          <span className={s.checkbox__custom}></span>
          Пометить счет
        </label>
      </div>

      <div className={s.mydict}>
        <div>
          <label>
            <input type="radio" name="discount" defaultChecked={!order.discount ||  order.discount == 0} value={0} onChange={changeDiscount}/>
            <span>Нет скидки</span>
          </label>
          <label>
            <input type="radio" name="discount" defaultChecked={order.discount === 5} value={5} onChange={changeDiscount}/>
            <span>5%</span>
          </label>
          <label>
            <input type="radio" name="discount" defaultChecked={order.discount === 10} value={10} onChange={changeDiscount}/>
            <span>10%</span>
          </label>
        </div>
      </div>

      <ModalWithButton
        onClickPrimaryButton={() => {
          const form = document.getElementById('invoice-form');

          // @ts-ignore
          const isValid = form.reportValidity();
          if(isValid) {
            const invoice: Invoice = {
              orderId: order.orderId,
              briefcaseId: order.briefcaseId ?? '',
              deliveryRouteId: order.deliveryRoute?._id ?? '',
              orderItems: [],
              discount: discount,
              priceDelivery: priceDelivery,
              markOrder: isMarkOrder
            };

            // @ts-ignore
            [...form.elements].forEach((element) => {
              const productId = element.dataset.productid;
              const positionId = element.dataset.positionid;
              const comments = element.dataset.comments;
              const isGift = element.dataset.gift === "true";
              const { value, name } = element;
              const units = name === 'Яйцо Кур' || name === 'Яйцо Инд' ? 'дес.': 'кг.';

              invoice.orderItems.push({ productId, weight: +(+value).toFixed(2), units, positionId, comments, isGift});
            });

            createInvoice(invoice);
            setOpen(false);
          }

        }}
        onClickSecondaryButton={() => setOpen(false)}
        secondaryTitle={"Отменить"}
        titleButton={"Сформировать"}
      />
    </Modal>
);
};


