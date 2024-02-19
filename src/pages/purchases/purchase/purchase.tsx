import { useParams } from "react-router-dom";

import { Table } from "@/components/ui/table/Table";
import { Typography } from "@/components/ui/typography";
import { useGetBriefcaseByIdQuery } from "@/services/briefcase/briefcase.services";
import { BriefcaseOrder, OrderType } from "@/services/briefcase/briefcase.type";
import { useGetCatalogQuery } from "@/services/catalog/catalog.services";

export const Purchase = () => {
  const param = useParams();
  const { data: catalog, isLoading: loadingCatalog } = useGetCatalogQuery({});
  const { data, isLoading } = useGetBriefcaseByIdQuery({ id: param.id });

  if (isLoading || loadingCatalog) {
    return <div>Loading</div>;
  }
  const order = createPurchases(data.orders);

  return (
    <div>
      <Typography variant={"large"}>{data.name}</Typography>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            {catalog.map((el: any) => (
              <Table.Cell key={el.id} variant={"head"}>
                {el.name}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {catalog.map((el: any) => (
            <Table.Cell key={el.id}>
              {calculateTotalSum(el.name, order)}
            </Table.Cell>
          ))}
        </Table.Body>
      </Table.Root>
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

  return result;
};

const calculateTotalSum = (nameProduct: string, orders: OrderType[]) => {
  const needProductsArr = orders.filter((el) => el.name === nameProduct);
  const result = { quantity: 0, totalWeight: 0 };
  const regex = /[а-яА-ЯёЁ.]+$/;

  needProductsArr.forEach((el) => {
    if (el.quantity !== null) {
      // @ts-ignore
      if (el.quantity.match(regex)[0] === "шт.") {
        result.quantity = result.quantity + parseInt(el.quantity);
      }
      // @ts-ignore
      if (el.quantity.match(regex)[0] === "кг.") {
        result.totalWeight = result.totalWeight + parseInt(el.quantity);
      }
    }
  });

  return `${result.quantity}шт. ${result.totalWeight}кг.`;
};
