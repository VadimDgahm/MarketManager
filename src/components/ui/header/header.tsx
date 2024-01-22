import { forwardRef } from "react";

import s from "./header.module.scss";

export type HeaderInfoType = {};

export const Header = forwardRef<HTMLHeadElement, HeaderInfoType>(() => {
  return <div className={s.headerRoot}>Header</div>;
});
