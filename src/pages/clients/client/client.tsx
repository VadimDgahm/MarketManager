import {useParams} from 'react-router-dom';
import {useGetClientByIdQuery} from '@/services/clients/clients.services';
import {Card} from '@/components/ui/card';
import {Typography} from '@/components/ui/typography';
import {ClientType} from '@/services/clients/clientsServicesType';
import s from './client.module.scss'
import {Button} from '@/components/ui/button';
import {PlusCircleOutline} from '@/components/ui/icons/plus-circle-outline/PlusCircleOutline';

export const Client = () => {
    const param = useParams();
    const {data, isLoading} = useGetClientByIdQuery({id: param.id})
    if(isLoading) {
        return <div>isLoading</div>
    }
    return <div>
        <Card>
            <Typography className={s.text} variant={'h1'}>Информация о клиенте</Typography>
            <Typography className={s.text} variant={'body1'}>ФИО: {data?.name}</Typography>
            <Typography className={s.text} variant={'body1'}>Статус: {data.status}</Typography>
            <Typography className={s.text}  variant={'body1'}>Адресса:
               <div className={s.address}>
                   {data.addresses.length && data.addresses.map((el, i) => (<Typography  key={i}  className={s.tab} variant={'body1'}>
                       {++i}. ул.{el.street} д.{el.numberStreet} {el.buildingSection && `корпус${el.buildingSection}`},
                       кв.{el.numberApartment}, под.{el.lobby}, этаж.{el.floor}, {el.code && `код.${el.code}`}
                   </Typography>))}
               </div>
                <Button disabled variant={'secondary'}>Добавить адрес <PlusCircleOutline className={s.iconPlus}/></Button>
            </Typography>
            <Typography className={s.text} variant={'body1'}>Источник: {data.source}</Typography>
            <Typography className={s.text} variant={'body1'}>Телефоны:
                <div>
                    {data.phones.length && data.phones.map((el, i) => (<Typography key={i} className={s.tab} variant={'body1'}> {++i}. {el.tel}-{el.nameUserPhone}
                    </Typography>))}
                </div>
                <Button className={s.button}  title={"Возможность добавить номер телефона выйдет со след обновлением"} variant={'secondary'}>Номер телефона <PlusCircleOutline className={s.iconPlus}/></Button>
            </Typography>
            <Typography className={s.text} variant={'body1'}>Дата последнего заказа: {data.dateLastOrder}</Typography>
            <Typography className={s.text} variant={'body1'}>Дата создания клиента: {data.createdDate}</Typography>

        </Card>
    </div>;
};
