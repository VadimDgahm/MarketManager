import {forwardRef, useState} from "react";
import s from "./header.module.scss";
import { Typography } from "@/components/ui/typography";
import {Navigate, NavLinks} from "@/components/ui/navigate/navigate";

export type HeaderInfoType = {};

export const Header = forwardRef<HTMLHeadElement, HeaderInfoType>(() => {
  const [hide, setHide] = useState<boolean>(true);

  return (
    <>
    <div className={s.headerRoot}>
      <div className={s.logo}>
        <Typography variant={"body1"}>MMM</Typography>
        <Typography className={s.size} variant={"caption"}>
          Meat Market Manager
        </Typography>
      </div>

      <Navigate />

      <label className={s.burger} htmlFor="burger">
        <input type="checkbox" id="burger" onChange={() => setHide(!hide)}/>
        <span></span>
        <span></span>
        <span></span>
      </label>

      <div>
        <span className={s.beta}>beta</span> 0.1.1
      </div>
    </div>
    <div className={s.burgerContainer + ' ' + (hide ? s.hide : '')}>
      <nav>
        <NavLinks />
      </nav>
    </div>
    </>
  );
});
