import { useState } from "react";

import { Input } from "@/components/ui/Input";
import { TabSwitcher, ValuesPosition } from "@/components/ui/tabSwitcher";
import { CellVariant } from "@/components/ui/table/TableCellVariant/TableCellVariant";
import { Typography } from "@/components/ui/typography";
import { useRemoveClientByIdMutation } from "@/services/clients/clients.services";

import s from "./controlClient.module.scss";
type ControlClientProps = {
  id: string;
};
export const ControlClient = ({ id }: ControlClientProps) => {
  const [removeClient] = useRemoveClientByIdMutation();

  return (
    <>
      <CellVariant.EditAndTrash
        onClickEdit={() => {}}
        onClickTrash={() => removeClient({ id })}
      />
    </>
  );
};

type ChangeInfoAboutClientProps = {
  changeValue: (value: string | undefined) => void;
  title: string;
  value: string | undefined;
};
export const ChangeInfoAboutClient = ({
  changeValue,
  title,
  value,
}: ChangeInfoAboutClientProps) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [valueInput, setValueInput] = useState(value);
  const saveChanged = () => {
    setIsEditorOpen(false);
    changeValue(valueInput);
  };

  return (
    <div className={s.content}>
      <Typography className={s.title} variant={"h3"}>
        {title}:
      </Typography>
      {isEditorOpen ? (
        <Input
          autoFocus
          onBlur={saveChanged}
          onValueChange={(value) => setValueInput(value)}
          value={valueInput}
        />
      ) : (
        <Typography onDoubleClick={() => setIsEditorOpen(true)}>
          {value}
        </Typography>
      )}
    </div>
  );
};

type ChangeStatusProps = {
  changeStatus: (value: string | undefined) => void;
  collection: ValuesPosition[];
  status: string | undefined;
};
export const ChangeStatus = ({
  changeStatus,
  collection,
  status,
}: ChangeStatusProps) => {
  const statusObj = collection.find((el) => el.value === status);

  const [value, setValue] = useState(statusObj.location);
  const onChangeStatus = (value: string) => {
    const obj = collection.find((el) => el.location === value);

    changeStatus(obj.value);
    setValue(value);
  };

  return (
    <div className={s.tab}>
      <TabSwitcher
        onValueChange={onChangeStatus}
        value={value}
        valuesCollection={collection}
      />
    </div>
  );
};
