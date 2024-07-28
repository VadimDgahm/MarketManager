// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Table } from "@/components/ui/table/Table";
import { BriefcaseOrder, BriefcaseType, OrderType } from "@/services/briefcase/briefcase.type";
import { viewProduct } from "@/pages/catalog/catalog";
import s from "./purchase.module.scss";

import { useEffect, useState } from "react";
import { optionsView } from "@/pages/catalog/catalog";
import { ChangeStatus } from "@/pages/clients/client/controlClient/controlClient";
import { ProductType } from "@/services/catalog/catalog-servicesType";



type TPurchase = {
  data: BriefcaseType
  catalog: ProductType[]
  dataOrders: BriefcaseOrder[]
}
type TEmptyArray<Y> = Y[] | [] 

type TViewsOrder = Record<viewProduct, TEmptyArray<OrderType>>

export const Purchase = ({data, catalog, dataOrders}: TPurchase) => {
  const [currencyOrders, setCurrencyOrders] = useState<TEmptyArray<OrderType>>([]);
  const [filterView, setFilterView] = useState<viewProduct>(viewProduct.CHICKEN_VIEW);
  const [orders, setOrder] = useState<TViewsOrder>({
    [viewProduct.PORK_VIEW]: [],
    [viewProduct.BEEF_VIEW]: [],
    [viewProduct.TURKEY_VIEW]: [],
    [viewProduct.RABBIT_VIEW]: [],
    [viewProduct.CHICKEN_VIEW]: [],
  });

  useEffect(() => {
    if (dataOrders) {
      const ordersObj = createPurchases(dataOrders);
      setOrder(ordersObj);
      setCurrencyOrders(ordersObj[filterView]);
    }
  }, [dataOrders]);

  const onChangeView = (value: string) => {
    switch (value) {
      case viewProduct.PORK_VIEW:
        setCurrencyOrders(orders[viewProduct.PORK_VIEW]);
        setFilterView(viewProduct.PORK_VIEW);
        break;
      case viewProduct.BEEF_VIEW:
        setCurrencyOrders(orders[viewProduct.BEEF_VIEW]);
        setFilterView(viewProduct.BEEF_VIEW);
        break;
      case viewProduct.TURKEY_VIEW:
        setCurrencyOrders(orders[viewProduct.TURKEY_VIEW]);
        setFilterView(viewProduct.TURKEY_VIEW);
        break;
      case viewProduct.RABBIT_VIEW:
        setCurrencyOrders(orders[viewProduct.RABBIT_VIEW]);
        setFilterView(viewProduct.RABBIT_VIEW);
        break;
      default:
        setCurrencyOrders(orders[viewProduct.CHICKEN_VIEW]);
        setFilterView(viewProduct.CHICKEN_VIEW);
    }
  };
  return (
    <div>
      <ChangeStatus
        changeStatus={(value) => onChangeView(value)}
        collection={optionsView}
        status={filterView}
      />
      <div className={s.table}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button-purchase"
          className={s.btnDownload}
          table="purchaseOrder"
          filename={`Таблица заказов ${data.name}-${filterView}`}
          sheet="лист1"
          buttonText="Скачать как XLS"
        />
        <Table.Root id={"purchaseOrder"}>
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
                      <div> {order.quantity} {order.comments ? `(${order.comments})` : ''}</div>
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

const createPurchases = (data: BriefcaseOrder[]): TViewsOrder => {
  const result: OrderType[] = [];

  data.forEach((el) => {
    el.orderClient.forEach((order) => {
      result.push(order);
    });
  });

  const ordersWitPork = result.filter((order) => order.view === viewProduct.PORK_VIEW);
  const ordersWitBeef = result.filter((order) => order.view === viewProduct.BEEF_VIEW);
  const ordersWithChicken = result.filter(
    (order) => order.view === viewProduct.CHICKEN_VIEW
  );
  const ordersWitRabbit = result.filter((order) => order.view === viewProduct.RABBIT_VIEW);
  const ordersWitTurkey = result.filter((order) => order.view === viewProduct.TURKEY_VIEW);
  return {
   [viewProduct.PORK_VIEW]: ordersWitPork,
   [viewProduct.BEEF_VIEW]: ordersWitBeef,
   [viewProduct.CHICKEN_VIEW]: ordersWithChicken,
   [viewProduct.RABBIT_VIEW]: ordersWitRabbit,
   [viewProduct.TURKEY_VIEW]:ordersWitTurkey,
  };
};

const calculateTotalSum = (nameProduct: string, orders: TEmptyArray<OrderType>) => {
  
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

  return `${result.quantity}шт. ${result.totalWeight.toFixed(2)}кг.`;
};

const readNumber = (nameProduct: string, orders: OrderType[]) => {
  return orders?.filter((el) => el.name === nameProduct);
};
