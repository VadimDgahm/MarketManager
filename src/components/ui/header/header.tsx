import {forwardRef, useState} from "react";
import s from "./header.module.scss";
import { Typography } from "@/components/ui/typography";
import { NavLinks} from "@/components/ui/navigate/navigate";

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
        <a href={'yandexnavi://build_route_on_map?lat_to=55.7558&lon_to=37.6176&description=%D0%A0%D0%B0%D1%84%D0%B8%D0%B5%D0%B2%D0%B0%2C+%D0%B4.109%2C+%D0%BA%D0%B2.86'} >
          test
        </a>
      </div>

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
