import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { HomeOutline } from "@/components/ui/icons/homeOutline/HomeOutline";
import { LayersOutline } from "@/components/ui/icons/layers-outline/LayersOutline";
import { PersonOutline } from "@/components/ui/icons/person-outline/PersonOutline";
import { Portfile } from "@/components/ui/icons/portfile/portfile";
import { PurchaseIcon } from "@/components/ui/icons/purchase/purchaseIcon";

import s from "./navigate.module.scss";

export const Navigate = () => {
  return (
    <nav className={s.navigate}>
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
    </nav>
  );
};

type IconLink = {
  icon?: ReactNode;
  name: string;
  url: string;
};
const IconLink = ({ icon, name, url }: IconLink) => {
  return (
    <div className={s.boxLink}>
      {icon}
      <NavLink
        className={({ isActive }) =>
          [s.link, isActive ? s.active : ""].join(" ")
        }
        to={`/${url}`}
      >
        {name}
      </NavLink>
    </div>
  );
};
