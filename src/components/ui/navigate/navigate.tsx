import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { HomeOutline } from "@/components/ui/icons/homeOutline/HomeOutline";
import { PersonOutline } from "@/components/ui/icons/person-outline/PersonOutline";
import { Portfile } from "@/components/ui/icons/portfile/portfile";
import { PurchaseIcon } from "@/components/ui/icons/purchase/purchaseIcon";
import {Expand} from "@/components/ui/icons/expand/Expand";
import s from "./navigate.module.scss";

export const Navigate = () => {
  return (
    <nav className={s.navigate}>
      <NavLinks />
    </nav>
  );
};

export const NavLinks = () => {
  return (
    <>
      <IconLink
        icon={<PersonOutline className={s.icon} />}
        name={"Клиенты"}
        url={"clients"}
      />
      <IconLink
        icon={<HomeOutline className={s.icon} />}
        name={"Каталог"}
        url={"catalog"}
      />
      <IconLink
        icon={<Portfile className={s.icon} />}
        name={"Портфели"}
        url={"briefcases"}
      />
      <IconLink
        icon={<PurchaseIcon className={s.icon} />}
        name={"Закупки"}
        url={"purchases"}
      />
      <IconLink
        icon={<Expand className={s.icon} />}
        name={"Маршруты"}
        url={"deliveryRoutes"}
      />
    </>
  );
}


type IconLink = {
  icon?: ReactNode;
  name: string;
  url: string;
};
export const IconLink = ({ icon, name, url }: IconLink) => {
  return (
    <div className={s.boxLink}>

      <NavLink
        className={({ isActive }) =>
          [s.link, isActive ? s.active : ""].join(" ")
        }
        to={`/${url}`}
      >
        {icon}{name}
      </NavLink>
    </div>
  );
};
