import { Table } from "@/components/ui/table/Table";
import { useGetBriefcaseQuery } from "@/services/briefcase/briefcase.services";

import s from "./tableBriefcases.module.scss";
import { BriefcaseRow } from "@/pages/briefcase/tableBriefcase/briefcaseRow/briefcaseRow";
import {Loader} from "@/components/ui/loader/loader";

export const TableBriefcases = () => {
  return (
    <Table.Root className={s.table}>
      <ContentTableHead />
      <ContentTableBody />
    </Table.Root>
  );
};

const ContentTableHead = () => {
  return (
    <Table.Head>
      <Table.Row>
        <Table.Cell variant={"head"}>Название портфеля</Table.Cell>
        <Table.Cell variant={"head"}>Дата создания</Table.Cell>
        <Table.Cell variant={"head"}></Table.Cell>
      </Table.Row>
    </Table.Head>
  );
};
const ContentTableBody = () => {
  const { data, isLoading } = useGetBriefcaseQuery({});

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table.Body>
      {data?.map((briefcase: BriefcaseType) => (
        <BriefcaseRow key={briefcase.id} briefcase={briefcase} />
      ))}
    </Table.Body>
  );
};

export type BriefcaseType = {
  createdDate: string;
  id: string;
  name: string;
  orders: any;
  userId: string;
};
