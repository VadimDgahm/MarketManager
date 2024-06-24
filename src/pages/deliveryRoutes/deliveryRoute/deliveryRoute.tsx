import {useParams} from "react-router-dom";
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {Typography} from "@/components/ui/typography";
import s from "@/pages/briefcase/briefcase/briefcase.module.scss";
import {useGetRouteByIdQuery} from "@/services/deliveryRoutes/deliveryRoute.services";
import {TableDeliveryRouteOrder} from "@/pages/deliveryRoutes/deliveryRoute/tableDeliveryRouteOrder";

export const DeliveryRoute = () => {
  const params = useParams();
  const {data, isLoading} = useGetRouteByIdQuery({id: params.id});

  if (isLoading) {
    return <div>isLoading</div>;
  }

  return (
    <div className={s.briefcase}>
      <Typography className={s.headerTitle} variant={"h1"}>
        Маршрут: {data.name}
      </Typography>
      <div>
        <div className={s.table}>
          {!data.orders?.length ? (
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
              <TableDeliveryRouteOrder data={data}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


