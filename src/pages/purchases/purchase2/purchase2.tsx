import { Loader } from "@/components/ui/loader/loader";
import {useGetBriefcaseByIdPurchaseQuery} from "@/services/briefcase/briefcase.services";
import { useParams } from "react-router-dom";
import s from "./purchase2.module.scss";
import {
  filterDataByNameDeliveryAndViewProduct,
  getDeliveryName,
  parseOrderData,
} from "../parseOrderData/parseOrderData";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Typography } from "@/components/ui/typography";
import { TabSwitcher, ValuesPosition } from "@/components/ui/tabSwitcher";
import { useState } from "react";
import {
  SHOW_ALL,
  arrViewProductsPosition,
  calculateTotalSum,
  showAllValuePosition,
} from "./utils";
import { viewProduct } from "@/pages/catalog/catalog";
import { Table } from "@/components/ui/table/Table";

const Purchases2 = () => {
  const param = useParams();
  const { data, isLoading, isError } = useGetBriefcaseByIdPurchaseQuery({
    id: param.id,
  });

  const [currentNameDelivery, setCurrentNameDelivery] =
    useState<string>(SHOW_ALL);
  const [currentView, setCurrentView] = useState<string>(
    viewProduct.CHICKEN_VIEW
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!data || isError) {
    return <div>Данных нет. Попробуйте перезагрузить страницу</div>;
  }

  const parseData = parseOrderData(data.orders);

  const arrDeliveryName: ValuesPosition<string>[] = [
    ...getDeliveryName(parseData),
    showAllValuePosition,
  ];

  const currentData = filterDataByNameDeliveryAndViewProduct(
    currentNameDelivery,
    currentView,
    parseData
  );

  return (
    <div className={s.table}>
      <Typography variant={"large"}>{data.name}</Typography>

      <Typography variant={"h2"}>Фильтр</Typography>
      <div>
        <TabSwitcher
          onValueChange={setCurrentNameDelivery}
          value={currentNameDelivery}
          valuesCollection={arrDeliveryName}
        />
      </div>
      <div>
        <TabSwitcher
          onValueChange={setCurrentView}
          value={currentView}
          valuesCollection={arrViewProductsPosition}
        />
      </div>
      <ReactHTMLTableToExcel
        className={s.btnExel}
        id="table-xls-button-purchase"
        table="purchaseOrder"
        filename={`Закупка ${data.name}-${currentNameDelivery}-${currentView}`}
        sheet="лист1"
        buttonText="Скачать"
      />

      <Table.Root id={"purchaseOrder"}>
        <Table.Head>
          <Table.Row>
            {currentData.map((product) => (
              <Table.Cell key={`${product.productName}-head`} variant={"head"}>
                {product.productName}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            {currentData.map((product) => (
              <Table.Cell key={`${product.productName}-calc`}>
                {calculateTotalSum(product.quantities)}
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row>
            {currentData.map((product) => (
              <Table.Cell key={`${product.productName}-num`}>
                {product.quantities.map((el, i) => (
                  <div key={i}>{el}</div>
                ))}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export { Purchases2 };
