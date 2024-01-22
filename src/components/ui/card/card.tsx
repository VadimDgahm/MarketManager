import { ComponentPropsWithoutRef, FC } from "react";

import clsx from "clsx";

import s from "./card.module.scss";

type CardProps = {} & ComponentPropsWithoutRef<"div">;

export const Card: FC<CardProps> = (props) => {
  const classNames = clsx(s.card, s["defaultSize"], props.className);

  return <div {...props} className={`${classNames}`}></div>;
};
