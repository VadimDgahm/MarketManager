import { FC } from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import s from "./MenuContentWichAvatar.module.css";

import defaultAvatar from "../../../img/avatar.png";

type PropsType = {
  avatar?: null | string;
  isLine?: boolean;
  name: string | undefined;
  onClickAvatar?: () => void;
  url: string | undefined;
};
export const MenuContentWithAvatar: FC<PropsType> = ({
  avatar,
  isLine = true,
  name,
  onClickAvatar,
  url,
}) => {
  return (
    <DropdownMenu.Item
      className={`${s.DropdownMenuItem} ${s.content} ${isLine && s.line}`}
    >
      <img
        alt={""}
        className={`${s.avatar} ${!!onClickAvatar && s.clickAvatar}`}
        onClick={onClickAvatar}
        src={avatar ?? defaultAvatar}
      />
      <div className={s.info}>
        <h4 className={`${s.name} `} onClick={onClickAvatar}>
          {name}
        </h4>
        <a className={s.url}>{url}</a>
      </div>
    </DropdownMenu.Item>
  );
};
