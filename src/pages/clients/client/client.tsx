import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Addresses } from "@/pages/clients/client/addresses/addresses";
import {
  collectionSource,
  collectionStatus,
} from "@/pages/clients/client/collection";
import {
  ChangeInfoAboutClient,
  ChangeStatus,
} from "@/pages/clients/client/controlClient/controlClient";
import { Phones } from "@/pages/clients/client/phones/phones";
import { useClient } from "@/pages/clients/client/useClient";
import { useGetClientByIdQuery } from "@/services/clients/clients.services";

import s from "./client.module.scss";

export const Client = () => {
  const { changeName, changeSource, changeStatus, param } = useClient();
  const { data, isLoading } = useGetClientByIdQuery({ id: param.id });

  if (isLoading || !data) {
    return <div>isLoading</div>;
  } else {
    return (
      <div className={s.card}>
        <Card className={s.content}>
          <div className={s.header}>
            <Typography className={s.text} variant={"h1"}>
              Информация о клиенте
            </Typography>
            <Typography className={s.date} variant={"overline"}>
              {data.createdDate}
            </Typography>
          </div>

          <ChangeInfoAboutClient
            changeValue={changeName}
            title={"ФИО"}
            value={data?.name}
          />

          <Addresses data={data.addresses} />
          <Phones data={data.phones} />
          <Typography className={s.text} variant={"body1"}>
            Пришел к нам: {data.dateLastOrder}
          </Typography>
          <ChangeStatus
            changeStatus={changeSource}
            collection={collectionSource}
            status={data?.source || "неопределен"}
          />
          <Typography className={s.text} variant={"body1"}>
            Дата последнего заказа: {data.dateLastOrder}
          </Typography>
          <ChangeStatus
            changeStatus={changeStatus}
            collection={collectionStatus}
            status={data?.status}
          />
        </Card>
      </div>
    );
  }
};
