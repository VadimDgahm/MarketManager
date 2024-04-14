import { Typography } from "@/components/ui/typography";

import s from "./tableRowClient.module.scss";
import { EditIcon } from "@/components/ui/icons/edit/EditIcon";
import { useNavigate } from "react-router-dom";

type TableRowClientProps = {
  name: string;
  onClick: () => void;
  phone: string;
  id: string;
};
export const TableRowClient = ({
  name,
  onClick,
  phone,
  id,
}: TableRowClientProps) => {
  const navigate = useNavigate();

  return (
    <div className={s.row}>
      <div className={s.box} title={"Редактировать клиента"}>
        <Typography variant={"body2"}>{name}</Typography>
        <EditIcon
          className={s.editButton}
          onClick={() => navigate(`/clients/${id}`)}
        />
      </div>
      <Typography variant={"body2"}>{phone || "нет данных"}</Typography>
      <button className={s.btnСhooseClient} onClick={onClick}>
        <Typography variant={"caption"}>+</Typography>
      </button>
    </div>
  );
};
