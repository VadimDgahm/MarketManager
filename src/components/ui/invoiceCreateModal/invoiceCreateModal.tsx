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
  weight: number;
  units:string;
}

type Invoice = {
  orderId: string;
  briefcaseId: string;
  deliveryRouteId: string;
  orderItems: OrderItems[];
  discount: number;
  priceDelivery: number;
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

  function changeDiscount(e: React.ChangeEvent<HTMLInputElement>) {
    setDiscount(+e.target.value);
  }

  function changePriceDelivery(e: React.ChangeEvent<HTMLInputElement>) {
    setPriceDelivery(+e.target.value);
  }

  return (
    <Modal onOpenChange={setOpen} open={open} title={title + ' - ' + order.clientName}>
      <ModalWithContent>
        <form className={s.form} id={"invoice-form"}>
          {orderItems.map((item, index) => {
            return (
              <div className={s.inputContainer} key={index + item.productId}>
                <label className={s.label}>{item.name}</label>
                <div className={s.control}>
                  <input className={s.input} data-units={
                    //@ts-ignore
                    item.quantity ? item.quantity.slice(-3) : item.units
                  } name={item.name} defaultValue={
                    //@ts-ignore
                    item.weight
                  } step="0.01" data-productid={item.productId}  type={"number"}  min={0} required={true}/>
                  <label>{order.orderClient[index].quantity}</label>
                </div>
              </div>
            )
          })}
        </form>

        <label className={s.label}>Доставка</label>
        <input className={s.input} type={"number"}  min={0} step="0.01" value={priceDelivery} onChange={changePriceDelivery}/>

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

      </ModalWithContent>
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
              priceDelivery: priceDelivery
            };

            // @ts-ignore
            [...form.elements].forEach((element) => {
              const units = element.dataset.units;
              const productId = element.dataset.productid;
              const { value } = element

              invoice.orderItems.push({ productId: productId, weight: +(+value).toFixed(2), units});
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
