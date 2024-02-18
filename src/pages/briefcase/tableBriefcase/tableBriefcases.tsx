import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DeleteModal } from "@/components/ui/delete-modal/deleteModal";
import { Table } from "@/components/ui/table/Table";
import { CellVariant } from "@/components/ui/table/TableCellVariant/TableCellVariant";
import {
  useGetBriefcaseQuery,
  useRemoveBriefcaseMutation,
} from "@/services/briefcase/briefcase.services";

import s from "./tableBriefcases.module.scss";

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
  const [removeBriefcase] = useRemoveBriefcaseMutation();
  const [isOpenModal, setIsOpenModal] = useState<boolean[]>([]);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>isLoading</div>;
  }

  const removeBriefcaseHandler = (id: string, index: number) => {
    removeBriefcase({ id });
    setIsOpenModal((prev) => {
      const updatedModalState = [...prev];

      updatedModalState[index] = false;

      return updatedModalState;
    });
  };

  return (
    <Table.Body>
      {data?.map((briefcase: BriefcaseType, index) => (
        <Table.Row key={briefcase.id}>
          <Table.Cell
            className={s.linkBriefcase}
            onClick={() => navigate(`/briefcases/${briefcase.id}`)}
          >
            {briefcase.name}
          </Table.Cell>
          <Table.Cell>{briefcase.createdDate}</Table.Cell>
          <Table.Cell>
            <CellVariant.EditAndTrash
              onClickEdit={() => {}}
              onClickTrash={() => {
                setIsOpenModal((prev) => {
                  const updatedModalState = [...prev];

                  updatedModalState[index] = true;

                  return updatedModalState;
                });
              }}
            />
            <DeleteModal
              name={briefcase.name}
              open={isOpenModal[index]}
              removeHandler={function () {
                removeBriefcaseHandler(briefcase.id, index);
              }}
              setOpen={(isOpen) =>
                setIsOpenModal((prev) => {
                  const updatedModalState = [...prev];

                  updatedModalState[index] = isOpen;

                  return updatedModalState;
                })
              }
              title={"Удаление клиента"}
            />
          </Table.Cell>
        </Table.Row>
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
