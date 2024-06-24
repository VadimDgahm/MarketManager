import s from "./deliveryRoute.module.scss";
import {FullAddress} from "@/pages/utils/addresses";
import {useState} from "react";
import {arrayMove, List} from "react-movable";
import {Button} from "@/components/ui/button";
import {DeliveryRouteResponseType} from "@/services/deliveryRoutes/deliveryRoute.type";
import {useSortRouteMutation} from "@/services/deliveryRoutes/deliveryRoute.services";
import {CellVariant} from "@/components/ui/table/TableCellVariant/TableCellVariant";
import {DeliveryRouteEditModal} from "@/components/ui/deliveryRouteEditModal/deliveryRouteEditModal";

type TableOrdersProps = {
  data: DeliveryRouteResponseType;
};

export const TableDeliveryRouteOrder = ({data}: TableOrdersProps) => {
  const [items, setItems] = useState(structuredClone(data.orders));
  const [sortRoute, {isLoading}] = useSortRouteMutation();
  const [isOpenDeliveryRouteModal, setIsOpenDeliveryRouteModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState(data.orders[0]);
  console.log(data);
  function saveSortOrder() {
    const result: DeliveryRouteResponseType = structuredClone(data);

    for (const briefcase of result.briefcases) {
      const orderIds: {orderId: string, sort: number}[] = [];

      for (const orderId of briefcase.orderIds) {
        items.forEach((item, index) => {
          if(item.deliveryRoute?._id === result._id && item.orderId === orderId.orderId) {
            orderIds.push(orderId)
            orderId.sort = index + 1;
          }
        });
      }

      briefcase.orderIds = orderIds;
    }

    // @ts-ignore
    delete result.orders;
    sortRoute(result);

    if (!isLoading) {
      alert('Данные измененны!')
    }
  }

  return (
    <>
      <Button className={s.save} variant={"primary"} onClick={() => saveSortOrder()}>Сохранить изменения</Button>

      <List
        values={items}
        onChange={({oldIndex, newIndex}) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({children, props}) => <table id={"orders-table"} className={s.table}>
          <thead className={s.head}>
          <tr>
            <th>№</th>
            <th></th>
            <th>Имя</th>
            <th>Номер телефона</th>
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
          <th>{value.clientName}</th>
          <th>{value.dataClient?.phones[0]?.tel}</th>
          <th>{value.dataClient?.addresses
            .filter((address) => value.addressId === address.idAddress)
            .map((address) => (
              <FullAddress address={address}/>
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
    </>
  )
}