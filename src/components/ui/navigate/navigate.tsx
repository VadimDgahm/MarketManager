import {ReactNode} from 'react';
import {NavLink} from 'react-router-dom';
import {LayersOutline} from '@/components/ui/icons/layers-outline/LayersOutline';
import {PersonOutline} from '@/components/ui/icons/person-outline/PersonOutline';

import s from './navigate.module.scss';
import {HomeOutline} from '@/components/ui/icons/homeOutline/HomeOutline';

export const Navigate = () => {
  return (
    <nav className={s.navigate}>
      <IconLink
        icon={<PersonOutline className={s.icon} />}
        name={"Клиенты"}
        url={"clients"}
      />
        <IconLink
            icon={<HomeOutline  className={s.icon} />}
            name={"Каталог"}
            url={"catalog"}
        />
      <IconLink
        icon={<LayersOutline className={s.icon} />}
        name={"Списки портфелей"}
        url={"briefcases"}
      />
      <IconLink
        icon={<LayersOutline className={s.icon} />}
        name={"Смета по продукции"}
        url={"listOder"}
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
