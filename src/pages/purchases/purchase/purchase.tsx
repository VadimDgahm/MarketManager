import { useParams } from "react-router-dom";

import { Table } from "@/components/ui/table/Table";
import { Typography } from "@/components/ui/typography";
import { useGetBriefcaseByIdQuery } from "@/services/briefcase/briefcase.services";
import { BriefcaseOrder, OrderType } from "@/services/briefcase/briefcase.type";
import { useGetCatalogQuery } from "@/services/catalog/catalog.services";
import {
  BEEF_VIEW,
  CHICKEN_VIEW,
  RABBIT_VIEW,
  TURKEY_VIEW,
  PORK_VIEW,
  TView,
} from "@/pages/catalog/catalog";
import s from "./purchase.module.scss";

import { useEffect, useState } from "react";
import { optionsView } from "@/pages/catalog/catalog";
import { ChangeStatus } from "@/pages/clients/client/controlClient/controlClient";
import { ProductType } from "@/services/catalog/catalog-servicesType";

interface TOrders<T> {
  ordersWitPork: T[];
  ordersWitBeef: T[];
  ordersWitTurkey: T[];
  ordersWitRabbit: T[];
  ordersWithChicken: T[];
}
export const Purchase = () => {
  const param = useParams();
  const { data: catalog, isLoading: loadingCatalog } = useGetCatalogQuery({});
  const { data, isLoading } = useGetBriefcaseByIdQuery({ id: param.id });
  const [currencyOrders, setCurrencyOrders] = useState<OrderType[]>([]);
  const [filterView, setFilterView] = useState<TView>(CHICKEN_VIEW);
  const [orders, setOrder] = useState<TOrders<OrderType>>({
    ordersWitPork: [],
    ordersWitBeef: [],
    ordersWitTurkey: [],
    ordersWitRabbit: [],
    ordersWithChicken: [],
  });

  useEffect(() => {
    if (data) {
      const ordersObj = createPurchases(data.orders);
      setOrder(ordersObj);
      setCurrencyOrders(ordersObj.ordersWithChicken);
    }
  }, [data]);

  if (isLoading || loadingCatalog) {
    return <div>Loading</div>;
  }

  const onChangeView = (value: string) => {
    switch (value) {
      case PORK_VIEW:
        setCurrencyOrders(orders.ordersWitPork);
        setFilterView(PORK_VIEW);
        break;
      case BEEF_VIEW:
        setCurrencyOrders(orders.ordersWitBeef);
        setFilterView(BEEF_VIEW);
        break;
      case TURKEY_VIEW:
        setCurrencyOrders(orders.ordersWitTurkey);
        setFilterView(TURKEY_VIEW);
        break;
      case RABBIT_VIEW:
        setCurrencyOrders(orders.ordersWitRabbit);
        setFilterView(RABBIT_VIEW);
        break;
      default:
        setCurrencyOrders(orders.ordersWithChicken);
        setFilterView(CHICKEN_VIEW);
    }
  };
  return (
    <div>
      <Typography variant={"large"}>{data.name}</Typography>
      <ChangeStatus
        changeStatus={(value) => onChangeView(value)}
        collection={optionsView}
        status={filterView}
      />
      <div className={s.table}>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              {catalog
                .filter((el: ProductType) => el.view === filterView)
                .map((el: ProductType) => (
                  <Table.Cell key={el.id} variant={"head"}>
                    {el.reductionName}
                  </Table.Cell>
                ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              {catalog
                .filter((el: ProductType) => el.view === filterView)
                .map((el: ProductType) => (
                  <Table.Cell key={el.id}>
                    {calculateTotalSum(el.name, currencyOrders)}
                  </Table.Cell>
                ))}
            </Table.Row>
            <Table.Row>
              {catalog
                .filter((el: ProductType) => el.view === filterView)
                .map((el: ProductType) => (
                  <Table.Cell key={el.id}>
                    {readNumber(el.name, currencyOrders).map((order) => (
                      <div> {order.quantity}</div>
                    ))}
                  </Table.Cell>
                ))}
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};
const createPurchases = (data: BriefcaseOrder[]) => {
  const result: OrderType[] = [];

  data.forEach((el) => {
    el.orderClient.forEach((order) => {
      result.push(order);
    });
  });
  const ordersWitPork = result.filter((order) => order.view === PORK_VIEW);
  const ordersWitBeef = result.filter((order) => order.view === BEEF_VIEW);
  const ordersWithChicken = result.filter(
    (order) => order.view === CHICKEN_VIEW
  );
  const ordersWitRabbit = result.filter((order) => order.view === RABBIT_VIEW);
  const ordersWitTurkey = result.filter((order) => order.view === TURKEY_VIEW);
  return {
    ordersWitPork,
    ordersWitBeef,
    ordersWithChicken,
    ordersWitRabbit,
    ordersWitTurkey,
  };
};

const calculateTotalSum = (nameProduct: string, orders: OrderType[]) => {
  const needProductsArr = orders?.filter((el) => el.name === nameProduct);
  const result = { quantity: 0, totalWeight: 0 };
  const regex = /[а-яА-ЯёЁ.]+$/;
  needProductsArr?.forEach((el) => {
    if (el.quantity !== null) {
      // @ts-ignore
      if (el.quantity.match(regex)[0] === "шт.") {
        // @ts-ignore
        result.quantity += +el.quantity.match(/^([\d.]+)(.*)$/)[1];
      }
      // @ts-ignore
      if (el.quantity.match(regex)[0] === "кг.") {
        // @ts-ignore
        result.totalWeight += +el.quantity.match(/^([\d.]+)(.*)$/)[1];
      }
    }
  });

  return `${result.quantity}шт. ${result.totalWeight}кг.`;
};

const readNumber = (nameProduct: string, orders: OrderType[]) => {
  const needProductsArr = orders?.filter((el) => el.name === nameProduct);
  return needProductsArr;
};
