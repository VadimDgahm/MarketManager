import { useState } from "react";

import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/typography";

import s from "./editableText.module.scss";
type EditableTextProps = {
  onChange: (newText: string) => void;
  text: string;
  title?: string;
};

export const EditableText = ({ onChange, text, title }: EditableTextProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(text);
  const onChangeText = () => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={s.box}>
      {title && (
        <Typography className={s.title} variant={"body2"}>
          {title}:
        </Typography>
      )}
      {!isOpen ? (
        <Typography className={s.text} onDoubleClick={() => setIsOpen(true)}>
          {value}
        </Typography>
      ) : (
        <Input
          autoFocus
          defaultValue={value}
          onBlur={onChangeText}
          onValueChange={setValue}
        />
      )}
    </div>
  );
};
