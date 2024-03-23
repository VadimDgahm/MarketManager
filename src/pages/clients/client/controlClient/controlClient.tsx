import { useEffect, useState } from "react";

import { Input } from "@/components/ui/Input";
import { TabSwitcher, ValuesPosition } from "@/components/ui/tabSwitcher";
import { Typography } from "@/components/ui/typography";

import s from "./controlClient.module.scss";

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
          placeholder={"Еще пока что нет коментариев"}
          autoFocus
          onBlur={saveChanged}
          onValueChange={(value) => setValueInput(value)}
          value={valueInput}
        />
      ) : (
        <Typography onDoubleClick={() => setIsEditorOpen(true)}>
          {value ? value : "Нет комментариев"}
        </Typography>
      )}
    </div>
  );
};

type ChangeStatusProps = {
  changeStatus: (value: string) => void;
  collection: ValuesPosition[];
  status: string | undefined;
};
export const ChangeStatus = ({
  changeStatus,
  collection,
  status,
}: ChangeStatusProps) => {
  const statusObj = collection.find((el) => el.value === status);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (statusObj) {
      setValue(statusObj.location);
    }
  }, []);

  const onChangeStatus = (value: string) => {
    const obj = collection.find((el) => el.location === value);

    if (obj) {
      changeStatus(obj.value);
      setValue(value);
    }
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
