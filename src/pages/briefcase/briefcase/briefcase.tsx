import { useState } from "react";
import { useParams } from "react-router-dom";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button } from "@/components/ui/button";
import { PlusSquareOutline } from "@/components/ui/icons/plus-square-outline/PlusSquareOutline";
import { Typography } from "@/components/ui/typography";
import {
  ModalCreateOrder,
  OrderClientType,
} from "@/pages/briefcase/briefcase/modalCreateOrder/modalCreateOrder";
import { TableOrders } from "@/pages/briefcase/briefcase/table/tableOrder/tableOrder";
import {
  useCreateOrderClientMutation,
  useGetBriefcaseByIdQuery,
} from "@/services/briefcase/briefcase.services";

import s from "./briefcase.module.scss";

export const Briefcase = () => {
  const params = useParams();
  const [isOpen, setOpen] = useState(false);
  const { data, isLoading } = useGetBriefcaseByIdQuery({ id: params.id });
  const [createOrderForClient] = useCreateOrderClientMutation();

  if (isLoading) {
    return <div>isLoading</div>;
  }
  const createOrder = (body: OrderClientType) => {
    createOrderForClient({ body, id: params.id });
  };

  return (
    <div className={s.briefcase}>
      <Typography className={s.headerTitle} variant={"h1"}>
        Портфель
      </Typography>
      <div className={s.title}>
        <Typography variant={"h1"}>{data.name}</Typography>
        <Typography variant={"subtitle2"}>{data.createdDate}</Typography>
      </div>
      <div>
        <Typography variant={"subtitle1"}>Tаблица заказов клиентов</Typography>
        <div className={s.table}>
          <Button
            className={s.button}
            onClick={() => setOpen(true)}
            variant={"secondary"}
          >
            <PlusSquareOutline className={s.icon} /> Создать заказ
          </Button>
          {!data.orders.length ? (
            <Typography className={s.tableTextEmpty} variant={"body1"}>
              Таблица пуста
            </Typography>
          ) : (
            <>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className={s.btnDownload}
                table="orders-table"
                filename={`Таблица заказов ${data.name}`}
                sheet="лист1"
                buttonText="Скачать как XLS"
              />
              <TableOrders orders={data.orders} idBriefcase={params.id} />
            </>
          )}
        </div>
      </div>
      <ModalCreateOrder
        isOpen={isOpen}
        onOpenWindow={setOpen}
        setResult={createOrder}
      />
    </div>
  );
};
