import s from './navigate.module.scss';
import {NavLink} from 'react-router-dom';
import {PersonOutline} from '@/components/ui/icons/person-outline/PersonOutline';
import {ReactNode} from 'react';
import {LayersOutline} from '@/components/ui/icons/layers-outline/LayersOutline';
import {Layers} from '@/components/ui/icons/layers/Layers';

export const Navigate = () => {
    return <nav className={s.navigate}>
        <IconLink icon={<PersonOutline className={s.icon}/>} name={'Клиенты'} url={'clients'}/>
        <IconLink icon={<LayersOutline className={s.icon}/>} name={'Списки заказов'} url={'listOder'}/>
        <IconLink icon={<LayersOutline className={s.icon}/>} name={'Смета по продукции'} url={'listOder'}/>
    </nav>;
};

type IconLink = {
    name: string
    url: string
    icon?: ReactNode
}
const IconLink = ({icon, url, name}: IconLink) => {
    return (
        <div className={s.boxLink}>
            {icon}
            <NavLink className={({isActive}) =>
                [
                    s.link,
                    isActive ? s.active : '',
                ].join(' ')} to={`/${url}`}>{name}</NavLink>
        </div>
    )
}