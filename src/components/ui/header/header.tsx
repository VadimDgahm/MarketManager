import { forwardRef } from "react";
import s from "./header.module.scss";
import { NavLink } from "react-router-dom";

export type HeaderInfoType = {};

export const Header = forwardRef<HTMLHeadElement, HeaderInfoType>(() => {
  return (
    <div className={s.headerRoot}>
      <NavLink to={"login"}>Войти</NavLink>
      <NavLink to={"/"}>Главная</NavLink>
    </div>
  );
});
