import { Typography } from "@/components/ui/typography";

import s from "./tableRowClient.module.scss";

type TableRowClientProps = {
  name: string;
  onClick: () => void;
  phone: string;
};
export const TableRowClient = ({
  name,
  onClick,
  phone,
}: TableRowClientProps) => {
  return (
    <div className={s.row}>
      <Typography variant={"body2"}>{name}</Typography>
      <Typography variant={"body2"}>{phone || "нет данных"}</Typography>
      <button className={s.btnСhooseClient} onClick={onClick}>
        <Typography variant={"caption"}>Выбрать</Typography>
      </button>
    </div>
  );
};
