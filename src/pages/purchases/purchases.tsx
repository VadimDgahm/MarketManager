import { useNavigate } from "react-router-dom";

import { Table } from "@/components/ui/table/Table";
import { Typography } from "@/components/ui/typography";
import { useGetBriefcaseQuery } from "@/services/briefcase/briefcase.services";

import s from "./purchases.module.scss";

export const Purchases = () => {
  const { data, isLoading } = useGetBriefcaseQuery({});
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className={s.content}>
      <Table.Root className={s.table}>
        <Table.Head>
          <Table.Row>
            <Table.Cell variant={"head"}>Название портфеля</Table.Cell>
            <Table.Cell className={s.cell} variant={"head"}>
              Дата создания
            </Table.Cell>
            <Table.Cell className={s.cell} variant={"head"}>
              Закупка
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map((el: any) => (
            <Table.Row key={el.id}>
              <Table.Cell>{el.name}</Table.Cell>
              <Table.Cell className={s.cell}>{el.createdDate}</Table.Cell>
              <Table.Cell
                className={s.clickCell}
                onClick={() => navigate(`/purchases/${el.id}`)}
              >
                <Typography className={s.click}> Посмотреть</Typography>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
