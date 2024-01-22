import { FC, ReactNode } from "react";

import { Typography } from "@/components/ui/typography";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import s from "./MenuContent.module.css";

type PropsType = {
  isLine?: boolean;
  onClick?: () => void;
  svgIcon?: ReactNode;
  title: string;
};
export const MenuContent: FC<PropsType> = ({
  isLine = true,
  onClick,
  svgIcon,
  title,
}) => {
  return (
    <DropdownMenu.Item
      className={` ${s.DropdownMenuItem} ${!isLine ? s.lastItem : s.item}`}
      onClick={onClick}
    >
      <div className={s.icon}>{svgIcon}</div>
      <Typography className={s.text} variant={"caption"}>
        {title}
      </Typography>
    </DropdownMenu.Item>
  );
};
