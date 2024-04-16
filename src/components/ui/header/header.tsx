import { forwardRef } from "react";
import s from "./header.module.scss";
import { Typography } from "@/components/ui/typography";

export type HeaderInfoType = {};

export const Header = forwardRef<HTMLHeadElement, HeaderInfoType>(() => {
  return (
    <div className={s.headerRoot}>
      <div className={s.logo}>
        <Typography variant={"body1"}>MMM</Typography>
        <Typography className={s.size} variant={"caption"}>
          Meat Market Manager
        </Typography>
      </div>

      <div>
        <span className={s.beta}>beta</span> 0.0.2
      </div>
    </div>
  );
});
