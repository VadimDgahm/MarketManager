import { Table } from "@/components/ui/table/Table";
import s from "@/pages/briefcase/tableBriefcase/tableBriefcases.module.scss";
import { CellVariant } from "@/components/ui/table/TableCellVariant/TableCellVariant";
import { ModalBriefcase } from "@/pages/briefcase/briefcases";
import { DeleteModal } from "@/components/ui/delete-modal/deleteModal";
import { BriefcaseType } from "@/pages/briefcase/tableBriefcase/tableBriefcases";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useChangeBriefcaseMutation,
  useRemoveBriefcaseMutation,
} from "@/services/briefcase/briefcase.services";

type BriefcaseRowProps = {
  briefcase: BriefcaseType;
};
export const BriefcaseRow = ({ briefcase }: BriefcaseRowProps) => {
  const navigate = useNavigate();
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenModalRemove, setIsOpenModalRemove] = useState<boolean>(false);
  const [removeBriefcase] = useRemoveBriefcaseMutation();
  const [changeBriefcase] = useChangeBriefcaseMutation();

  return (
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
          onClickEdit={() => setIsOpenEdit(true)}
          onClickTrash={() => setIsOpenModalRemove(true)}
        />
        <ModalBriefcase
          isOpen={isOpenEdit}
          onOpenWindow={setIsOpenEdit}
          onSubmitBriefcase={(body) =>
            changeBriefcase({
              id: briefcase.id,
              body,
            })
          }
          briefcase={briefcase}
        />
        <DeleteModal
          name={`портфель - ${briefcase.name}`}
          open={isOpenModalRemove}
          removeHandler={() => removeBriefcase(briefcase.id)}
          setOpen={(isOpen) => setIsOpenModalRemove(isOpen)}
          title={"Удалить портфель"}
        />
      </Table.Cell>
    </Table.Row>
  );
};
