import { Table } from "@/components/ui/table/Table";
import {
  BriefcaseOrder,
  ClientDataBriefcase,
} from "@/services/briefcase/briefcase.type";

import s from "./tableOrder.module.scss";
import { CellVariant } from "@/components/ui/table/TableCellVariant/TableCellVariant";
import { DeleteModal } from "@/components/ui/delete-modal/deleteModal";
import { useEffect, useState } from "react";
import {
  useRemoveOrderMutation,
  useUpdateOrderClientMutation,
} from "@/services/briefcase/briefcase.services";
import Modal from "@/components/ui/modal/modal";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import { Typography } from "@/components/ui/typography";
import { FormOrderClient } from "@/pages/briefcase/briefcase/modalCreateOrder/formOrderClient/formOrderClient";
import { BasketClient } from "@/pages/briefcase/briefcase/modalCreateOrder/basket/basket";
import { TabSwitcher } from "@/components/ui/tabSwitcher";
import { Input } from "@/components/ui/Input";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import { FullAddress } from "@/pages/utils/addresses";
import {DeliveryRouteEditModal} from "@/components/ui/deliveryRouteEditModal/deliveryRouteEditModal";
import {Button} from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { addressSortOrders, deliverySortOrders } from "@/pages/utils/sortOrders";

type TableOrdersProps = {
  orders: BriefcaseOrder[];
  idBriefcase: string | undefined;
};

const ASC = "asc"
const DESC = 'desc'

type TSort = 'asc' | 'desc'

export const TableOrders = ({ orders, idBriefcase }: TableOrdersProps) => {
  const [typeSort,setTypeSort] = useState<TSort>()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate()
  const [sortOrders, setSortOrders] = useState<BriefcaseOrder[]>(orders)

  useEffect(() => {
    const deliverySort = queryParams.get("deliverySort");
    const addressSort = queryParams.get('addressSort')
    const copyOrders =  [...structuredClone(orders)]
    if(deliverySort){
      const sortedOrders = copyOrders.sort((a,b) => deliverySortOrders(a,b,deliverySort))
      setSortOrders(sortedOrders)
    }
    else if(addressSort){
      const sortedOrders = copyOrders.sort((a,b) => addressSortOrders(a,b,addressSort))
      setSortOrders(sortedOrders)
    }
    else{
      setSortOrders(structuredClone(orders))
    }
  }, [ typeSort, orders])


  const deliverySortHandler = () => {
    queryParams.delete('addressSort')
    setTypeSort(typeSort === ASC ? DESC : ASC)
    const deliverySort = queryParams.get("deliverySort");
    queryParams.set('deliverySort', deliverySort === DESC ? ASC : DESC)
    navigate(`?${queryParams.toString()}`);
  }

  const addressSortHandler = () => {
    setTypeSort(typeSort === ASC ? DESC : ASC)
    queryParams.delete('deliverySort')
    const addressSort = queryParams.get('addressSort')
    queryParams.set('addressSort', addressSort === DESC ? ASC : DESC)
    navigate(`?${queryParams.toString()}`);
  }

  return (
    <>
      <Button className={s.sort} variant={"secondary"} onClick={addressSortHandler}>Сортировать по адресу</Button>
      <Button variant={"secondary"} onClick={deliverySortHandler}>Сортировать по маршруту</Button>

      <Table.Root className={s.table} id={"orders-table"}>
      <Table.Head>
        <Table.Row>
          <Table.Cell variant={"head"}>№</Table.Cell>
          <Table.Cell variant={"head"}></Table.Cell>
          <Table.Cell variant={"head"}></Table.Cell>
          <Table.Cell variant={"head"}>Имя</Table.Cell>
          <Table.Cell variant={"head"}>Номер телефона</Table.Cell>
          <Table.Cell variant={"head"}>Адрес</Table.Cell>
          <Table.Cell variant={"head"}>Заказ</Table.Cell>
          <Table.Cell variant={"head"}>Маршрут</Table.Cell>
          <Table.Cell variant={"head"}>Время</Table.Cell>
          <Table.Cell variant={"head"}></Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortOrders.map((el, i) => (
          <TableRawOrder
            key={el.orderId}
            index={i}
            order={el}
            idBriefcase={idBriefcase}
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
  idBriefcase: string | undefined;
};
const TableRawOrder = ({ index, order, idBriefcase }: TableRawOrderProps) => {
  const navigate = useNavigate()
  const client = order.dataClient;
  const [removeOrder] = useRemoveOrderMutation();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenDeliveryRouteModal, setIsOpenDeliveryRouteModal] = useState<boolean>(false);

  const removeOrderHandler = (orderId: string) => {
    removeOrder({ orderId, id: idBriefcase });
    setIsOpenModal(false);
  };

  return (
    <>
      <Table.Row className={s.table} key={order.orderId}>
        <Table.Cell>{++index}</Table.Cell>
        <Table.Cell>{client?.source?.substring(0, 4)}.</Table.Cell>
        <Table.Cell>{client?.status.substring(0, 6)}.</Table.Cell>
        <Table.Cell
        className={s.linkClient}
         onClick={() => navigate(`/clients/${order.clientId}`)}>
          {order.clientName}
          </Table.Cell>
        <Table.Cell>{client?.phones[0]?.tel}</Table.Cell>
        <Table.Cell>
          {client?.addresses
            .filter((address) => order.addressId === address.idAddress)
            .map((address) => (
              <FullAddress address={address} />
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
          <CellVariant.Edit onClickEdit={() =>setIsOpenDeliveryRouteModal(true)}/>
          <DeliveryRouteEditModal open={isOpenDeliveryRouteModal} idBriefcase={idBriefcase}
                                  order={order} title={"Изменить маршрут"}
                                  setOpen={setIsOpenDeliveryRouteModal}/>
        </Table.Cell>
        <Table.Cell>
          <div>{`${
            order.dayDelivery !== "Неважно" || "" ? order.dayDelivery : ""
          }`}</div>
          <div>{`${order.timeDelivery ? order.timeDelivery : ""}`}</div>
        </Table.Cell>
        <Table.Cell>
          <CellVariant.EditAndTrash
            onClickEdit={() => setIsOpenEditModal(true)}
            onClickTrash={() => setIsOpenModal(true)}
          />
          <DeleteModal
            name={`заказ - ${order.clientName}`}
            open={isOpenModal}
            removeHandler={() => removeOrderHandler(order.orderId)}
            setOpen={setIsOpenModal}
            title={"Удаление заказа"}
          />
          <EditOrderClient
            isOpen={isOpenEditModal}
            onOpenWindow={setIsOpenEditModal}
            order={order}
            idBriefcase={idBriefcase}
            client={client}
          />
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
        <Table.Cell />
        <Table.Cell />
      </Table.Row>
    </>
  );
};

type TEditOrderClient = {
  isOpen: boolean;
  onOpenWindow: (value: boolean) => void;
  order: BriefcaseOrder;
  idBriefcase: string | undefined;
  client: ClientDataBriefcase | undefined;
};
export const EditOrderClient = ({
  onOpenWindow,
  isOpen,
  order,
  idBriefcase,
  client,
}: TEditOrderClient) => {
  const [isEmptyOrderForm,setIsEmptyOrderForm] = useState<boolean>(false)
  const [arrProductsForClient, setArrProductsForClient] = useState(
    order.orderClient
  );
  const [dayDelivery, setDayDelivery] = useState(order.dayDelivery);
  const [timeDelivery, setTimeDelivery] = useState(order.timeDelivery);
  const [updateOrderClient] = useUpdateOrderClientMutation();
  const [addressId, setAddressId] = useState(order.addressId);
  const onSubmitHandler = () => {
    const body = {
      orderClient: arrProductsForClient,
      dayDelivery,
      timeDelivery,
      addressId,
    };
    updateOrderClient({ id: idBriefcase, orderId: order.orderId, body });
    onOpenWindow(false);
  };

  return (
    <Modal
      onOpenChange={onOpenWindow}
      open={isOpen}
      title={"Редактировать заказ"}
    >
      <ModalWithContent>
        {client?.addresses.map((address, i) => (
          <Typography
            className={`${s.address} ${
              addressId === address.idAddress ? s.done : s.red
            }`}
            variant={"body2"}
            onClick={() => setAddressId(address.idAddress)}
          >
            {++i}.{address?.street} {address.numberStreet}
          </Typography>
        ))}
        <div className={s.clientName}>
          <Typography variant={"body2"}>
            Клиент - {order?.clientName}
          </Typography>
        </div>
        <FormOrderClient
          cheackIsEmptyForm={setIsEmptyOrderForm}
          arrProductsForClient={arrProductsForClient}
          setArrProductsForClient={setArrProductsForClient}
        />
        <BasketClient
          arrProductsForClient={arrProductsForClient}
          setArrProductsForClient={setArrProductsForClient}
        />
        <div>
          <Typography variant={"subtitle2"}>Время</Typography>
          <TabSwitcher
            onValueChange={setDayDelivery}
            value={dayDelivery}
            valuesCollection={[
              { location: "Пятница", value: "Пятница" },
              { location: "Четверг", value: "Четверг" },
              { location: "Неважно", value: "Неважно" },
            ]}
          />
          <Input
            className={s.inputWeight}
            label={"Время доставки"}
            onValueChange={setTimeDelivery}
            value={timeDelivery}
          />
        </div>
      </ModalWithContent>
      <ModalWithButton
        disabled={isEmptyOrderForm}
        onClickPrimaryButton={onSubmitHandler}
        onClickSecondaryButton={() => onOpenWindow(false)}
        secondaryTitle={"Отменить"}
        titleButton={"Редактировать"}
      />
    </Modal>
  );
};
