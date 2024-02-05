import s from './briefcase.module.scss'
import {useParams} from 'react-router-dom';
import {useGetBriefcaseByIdQuery} from '@/services/briefcase/briefcase.services';
import {Typography} from '@/components/ui/typography';
import {Button} from '@/components/ui/button';
import {TableOrders} from '@/pages/briefcase/briefcase/tableOrder/tableOrder';
import {PlusSquareOutline} from '@/components/ui/icons/plus-square-outline/PlusSquareOutline';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Modal from '@/components/ui/modal/modal';
import ModalWithContent from '@/components/ui/modal/modalWithContent/modalWithContent';
import {ControlledInput} from '@/components/controlled/controlledInput/controlledInput';
import ModalWithButton from '@/components/ui/modal/modalWithButton/modalWithButton';
import {useState} from 'react';
import {Input} from '@/components/ui/Input';
import {useFindClientsQuery} from '@/services/clients/clients.services';
import {ClientType} from '@/services/clients/clientsServicesType';
import {Close} from '@/components/ui/icons/close/Close';

export const Briefcase = () => {
    const params = useParams()
    const [isOpen, setOpen] = useState(false)
    const {data, isLoading} = useGetBriefcaseByIdQuery({id: params.id})
    if (isLoading) {
        return <div>isLoading</div>;
    }
    return (
        <div className={s.briefcase}>
            <Typography variant={'h1'} className={s.headerTitle}>Портфель</Typography>
            <div className={s.title}>
                <Typography variant={'h1'}>{data.name}</Typography>
                <Typography variant={'subtitle2'}>{data.createdDate}</Typography>
            </div>
            <div>
                <Typography variant={'subtitle1'}>Tаблица заказов клиентов</Typography>
                <div className={s.table}>
                    <Button onClick={() => setOpen(true)} variant={'secondary'} className={s.button}> <PlusSquareOutline
                        className={s.icon}/> Создать заказ</Button>
                    {!data.orders.length
                        ? <Typography variant={'body1'} className={s.tableTextEmpty}>Таблица пуста</Typography>
                        : <TableOrders orders={data.orders}/>
                    }
                </div>
            </div>
            <ModalCreateOrder isOpen={isOpen} onOpenWindow={setOpen}/>
        </div>
    );
};


//////////////////////////////Модальное окно для создания заказа////////////////////////////////////////


const loginSchema = z.object({
    name: z.string().min(3, 'Минимум 3 символа').max(3000, 'Слишком большое имя'),
});

type ModalCreateBriefcaseProps = {
    isOpen: boolean;
    onOpenWindow: (open: boolean) => void;
};
type FormDataAddBriefcase = {
    name: string;
};
const ModalCreateOrder = ({isOpen, onOpenWindow}: ModalCreateBriefcaseProps) => {
    const {data} = useFindClientsQuery({})
    const [foundClients, setSearchClient] = useState([])
    const [showTextNotFound, setShowTextNotFound] = useState(false)
    const [value, setValue] = useState('')
    const [client, setClient] = useState<ClientType | undefined>(undefined)
    const {control, handleSubmit, reset} = useForm<FormDataAddBriefcase>({
        defaultValues: {
            name: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(loginSchema),
    });
    const onSubmitHandler = async (dateForm: FormDataAddBriefcase) => {
        reset();
        onOpenWindow(false);
    };
    const onChangeInput = (value: string) => {
        setValue(value)
    }
    const onClickSearchClient = () => {
        setShowTextNotFound(true)
        let regex = new RegExp(value.trim(), 'i');
        if (value.trim()) {
            const clientsFound = data.filter(el => regex.test(el.name) || regex.test(el.phones[0].tel))
            setSearchClient(clientsFound)
        } else {
            setSearchClient([])
        }

    }
    const choseClient = (clientObj: ClientType) => {
        setClient(clientObj)
    }
    const changeChooseClient = () => {
        setClient(undefined)
    }
    return (
        <Modal onOpenChange={onOpenWindow} open={isOpen} title={'Создать заказ'}>
            <ModalWithContent>
                {client
                    ? <div className={s.clientName}>
                        <Typography variant={'body2'}>Клиент - {client?.name}</Typography>
                        <div onClick={changeChooseClient}><Close width={18}/></div>
                    </div>
                    : <>
                        <div className={s.inputWithButtonBox}>
                            <Input className={s.inputSearch} onValueChange={onChangeInput} label={'Поиск клиента'}
                                   type={'search'}/> <Button variant={'tertiary'}
                                                             onClick={onClickSearchClient}>Поиск</Button>
                        </div>
                        <div>
                            {foundClients.length
                                ? foundClients.map((el: ClientType) => {
                                    return <TableRowClient key={el.id} onClick={() => choseClient(el)} name={el.name}
                                                           phone={el.phones[0].tel}/>
                                })
                                : showTextNotFound && <Typography variant={'subtitle2'}>Не найдено</Typography>
                            }
                        </div>
                    </>

                }


            </ModalWithContent>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <ModalWithContent>
                    <ControlledInput
                        className={s.input}
                        control={control}
                        label={'Название'}
                        name={'name'}
                    />
                </ModalWithContent>
                <ModalWithButton
                    onClickSecondaryButton={() => onOpenWindow(false)}
                    secondaryTitle={'Отменить'}
                    titleButton={'Создать'}
                />
            </form>
        </Modal>
    )
        ;
};

type TableRowClientProps = {
    name: string,
    phone: string,
    onClick: () => void
}
const TableRowClient = ({phone, name, onClick}: TableRowClientProps) => {

    return (
        <div className={s.row}>
            <Typography variant={'body2'}>{name}</Typography>
            <Typography variant={'body2'}>{phone}</Typography>
            <button className={s.btnСhooseClient} onClick={onClick}><Typography variant={'caption'}>Выбрать</Typography>
            </button>
        </div>
    )
}