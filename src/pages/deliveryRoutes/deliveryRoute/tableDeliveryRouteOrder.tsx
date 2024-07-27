import s from "./deliveryRoute.module.scss";
import {FullAddress} from "@/pages/utils/addresses";
import React, {useRef, useState} from "react";
import {arrayMove, List} from "react-movable";
import {Button} from "@/components/ui/button";
import {DeliveryRouteResponseType} from "@/services/deliveryRoutes/deliveryRoute.type";
import {useSortRouteMutation} from "@/services/deliveryRoutes/deliveryRoute.services";
import {CellVariant} from "@/components/ui/table/TableCellVariant/TableCellVariant";
import {DeliveryRouteEditModal} from "@/components/ui/deliveryRouteEditModal/deliveryRouteEditModal";
import {ToastComponent} from "@/components/ui/ToastComponent/ToastComponent";
import {toast} from "react-toastify";

type TableOrdersProps = {
  data: DeliveryRouteResponseType;
};

export const TableDeliveryRouteOrder = ({data}: TableOrdersProps) => {
  const [items, setItems] = useState(structuredClone(data.orders));
  const valueRef = useRef(items);
  const [sortRoute] = useSortRouteMutation();
  const [isOpenDeliveryRouteModal, setIsOpenDeliveryRouteModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState(data.orders[0]);
  const [flag, setFlag] = useState(false);

  function saveSortOrder() {
    const result: DeliveryRouteResponseType = structuredClone(data);

    for (const briefcase of result.briefcases) {
      const orderIds: {orderId: string, sort: number, time: string}[] = [];

      for (const orderId of briefcase.orderIds) {
        valueRef.current.forEach((item, index) => {
          if(item.deliveryRoute?._id === result._id && item.orderId === orderId.orderId) {
            orderIds.push(orderId)
            orderId.sort = index + 1;
            orderId.time = item.time ?? '';
          }
        });
      }

      briefcase.orderIds = orderIds;
    }

    // @ts-ignore
    delete result.orders;

    sortRoute(result);
  }

  async function copyText(e:  React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) {
    // @ts-ignore
    const text = e.target.innerText;

    await navigator.clipboard.writeText(text);

    toast.success("Скопировано: " + text);
  }

  return (
    <>
      <Button className={s.save} variant={"primary"} onClick={() => saveSortOrder()}>Сохранить изменения</Button>
      <ToastComponent/>
      <List
        values={items}
        onChange={({oldIndex, newIndex}) => {
          const newResult = arrayMove(items, oldIndex, newIndex);
          valueRef.current = newResult
          setItems(newResult);
          saveSortOrder()
        }}
        renderList={({children, props}) => <table id={"orders-table"} className={s.table}>
          <thead className={s.head}>
          <tr>
            <th>№</th>
            <th></th>
            <th>Имя</th>
            <th>Номер телефона</th>
            <th>Время доставки</th>
            <th>Адрес</th>
            <th>Заказ</th>
            <th>Маршрут</th>
            <th>Время</th>
          </tr>
          </thead>
          <tbody {...props}>{children}</tbody>
        </table>
        }
        renderItem={({value, index, isDragged, props}) => <tr className={isDragged ? s.drag : s.item} {...props}>
          <th>{
            // @ts-ignore
            ++index
          }</th>
          <th>{value.dataClient?.source?.substring(0, 4)}.</th>
          <th className={s.copy} role={"button"} onClick={copyText}>{value.clientName}</th>
          <th className={s.copy} role={"button"} onClick={copyText}>{value.dataClient?.phones[0]?.tel}</th>
          <th>
            <span className={s.hideTime}>{value.time ?? ''}</span>
            <input  className={s.inputTime} id={'input-time-' + index} value={value.time ?? ''} onChange={
              (e) => {
                value.time = e.target.value;
                setFlag(!flag);
                saveSortOrder();
              }
            }/>
          </th>
          <th>{value.dataClient?.addresses
            .filter((address) => value.addressId === address.idAddress)
            .map((address, index) => (
              <FullAddress address={address} key={'adr' + index}/>
            ))}
          </th>
          <th>
            {value.orderClient?.map((el) => (
              <span className={s.position} key={el.positionId}>
              {`${el.quantity}${el.reductionName}${
                el.comments && `(${el.comments})`
              }  _ _`}
            </span>
            ))}
          </th>
          <th> {`${value.deliveryRoute ? value.deliveryRoute.name : ""}`}
            <CellVariant.Edit role="button" onClickEdit={() => {setIsOpenDeliveryRouteModal(true); setSelectedOrder(value);}}/>
          </th>
          <th>
            <div>{`${value.dayDelivery !== "Неважно" || "" ? value.dayDelivery : ""}`}</div>
            <div>{`${value.timeDelivery ? value.timeDelivery : ""}`}</div>
          </th>

        </tr>}
      />
      <DeliveryRouteEditModal  open={isOpenDeliveryRouteModal} idBriefcase={selectedOrder.briefcaseId}
                               order={selectedOrder} title={"Изменить маршрут"}
                               setOpen={setIsOpenDeliveryRouteModal}/>
      <div className={s.popupCopy} id={"copy-popup"}></div>
    </>
  )
}
