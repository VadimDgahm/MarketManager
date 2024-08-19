import { ValuesPosition } from "@/components/ui/tabSwitcher";
import { viewProduct } from "@/pages/catalog/catalog";
import { BriefcaseOrder, OrderType } from "@/services/briefcase/briefcase.type";
import { SHOW_ALL } from "../purchase2/utils";

type TParseDeliveryOrderData<T> = {
  name: string;
  orders: T[];
};

const NOT_ADDED_IN_DELIVERY = "Не добавлены в маршрут";

const parseOrderData = (orders: BriefcaseOrder[]) => {
  const parseData = orders.reduce<TParseDeliveryOrderData<OrderType>[]>(
    (acc, cur) => {
      const deliveryName = cur.deliveryRoute?.name;

      if (!deliveryName) {
        const foundIndex = acc.findIndex(
          (deliveryOrder) => deliveryOrder.name === NOT_ADDED_IN_DELIVERY
        );
        if (foundIndex === -1) {
          const notAddInDeliveryObj = {
            name: NOT_ADDED_IN_DELIVERY,
            orders: [...cur.orderClient],
          };
          return [...acc, notAddInDeliveryObj];
        }
        acc[foundIndex].orders = [
          ...acc[foundIndex].orders,
          ...cur.orderClient,
        ];
        return acc;
      }

      const foundDeliveryNameIndex = acc.findIndex(
        (deliveryOrder) => deliveryOrder.name === deliveryName
      );

      if (foundDeliveryNameIndex === -1) {
        const deliveryObj = {
          name: deliveryName,
          orders: [...cur.orderClient],
        };
        return [...acc, deliveryObj];
      }

      acc[foundDeliveryNameIndex].orders = [
        ...acc[foundDeliveryNameIndex].orders,
        ...cur.orderClient,
      ];

      return acc;
    },
    []
  );

  return parseData;
};

type TSortOrder = {
  productName: string;
  quantities: string[];
  view: string;
};

const parseOrderDeliveryData = (
  deliveryData: TParseDeliveryOrderData<OrderType>
) => {
  const sortOrderByName = deliveryData.orders.reduce<TSortOrder[]>(
    (acc, cur) => {
      const foundProduct = acc.find(
        (product) => product.productName === cur.name
      );

      const quantityWithComment = `${cur.quantity}${
        cur.comments ? `(${cur.comments})` : ""
      }`;

      if (!foundProduct) {
        const newProductObj: TSortOrder = {
          productName: cur.name,
          quantities: [quantityWithComment],
          view: cur.view,
        };
        return [...acc, newProductObj];
      }

      foundProduct.quantities.push(quantityWithComment);

      return acc;
    },
    []
  );

  return sortOrderByName;
};

const getDeliveryName = (
  deliveryOrders: TParseDeliveryOrderData<OrderType>[]
) => {
  return deliveryOrders.reduce<ValuesPosition<string>[]>((acc, cur) => {
    return [...acc, { location: cur.name, value: cur.name }];
  }, []);
};

const getAllOrdersProducts = (
  deliveryOrder: TParseDeliveryOrderData<OrderType>[]
) => {
  return deliveryOrder.reduce<OrderType[]>((acc, cur) => {
    return [...acc, ...cur.orders];
  }, []);
};

const filterDataByNameDeliveryAndViewProduct = (
  nameDelivery: string,
  viewProduct: string,
  orders: TParseDeliveryOrderData<OrderType>[]
) => {
  if (nameDelivery === SHOW_ALL) {
    const allProducts: TParseDeliveryOrderData<OrderType> = {
      name: SHOW_ALL,
      orders: getAllOrdersProducts(orders),
    };
    return parseOrderDeliveryData(allProducts).filter(
      (product) => product.view === viewProduct
    );
  }

  const dataDelivery = orders.find(
    (deliveryOrder) => deliveryOrder.name === nameDelivery
  );

  if (!dataDelivery) {
    return [];
  }

  const data = parseOrderDeliveryData(dataDelivery).filter(
    (product) => product.view === viewProduct
  );

  return data;
};
export {
  parseOrderData,
  parseOrderDeliveryData,
  getDeliveryName,
  filterDataByNameDeliveryAndViewProduct,
};
