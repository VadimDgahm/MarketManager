import {TableClients} from '@/pages/clients/tableClients/tableClients';
import {Button} from '@/components/ui/button';
import s from './clients.module.scss'
import {PersonAddOutline} from '@/components/ui/icons/person-add-outline/PersonAddOutline';
import {useState} from 'react';
import Modal from '@/components/ui/modal/modal';
import ModalWithButton from '@/components/ui/modal/modalWithButton/modalWithButton';
import ModalWithContent from '@/components/ui/modal/modalWithContent/modalWithContent';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {ControlledInput} from '@/components/controlled/controlledInput/controlledInput';
import {Typography} from '@/components/ui/typography';
import {CreateClientBody} from '@/services/clients/clientsServicesType';
import {useCreateClientMutation} from '@/services/clients/clients.services';

export const Clients = () => {
    const [isOpen, setOpen] = useState(false)
    return (
        <div className={s.clientsContainer}>

            <div className={s.button}>
                <Button variant={'secondary'} onClick={() => setOpen(true)}><PersonAddOutline className={s.iconAdd}/>Создать
                    клиента</Button>
                <ModalCreateClient isOpen={isOpen} onOpenWindow={setOpen}/>
            </div>
            <TableClients/>

        </div>
    );
};

type ModalCreateClientProps = {
    isOpen: boolean
    onOpenWindow: () => void
}
type FormDataAddClient = {
    name: string
    phone: string
    city: string
    street: string,
    numberStreet: string,
    buildingSection: string,
    numberApartment: string,
    lobby: string
    floor: string
    statusAddress: string
    source: string
    comments: string
    code: string
}

const loginSchema = z.object({
    name: z
        .string()
        .min(3, 'Минимум 3 символа')
        .max(3000, 'Слишком большое имя'),
    phone: z
        .string()
        .regex(/^\+375\s?\(?17|25|29|33|44\)?\s?\d{3}-\d{2}-\d{2}$/, 'Неверный формат номера телефона Беларуси'),
    code: z.string().optional(),
    city: z.string().optional(),
    street: z.string(),
    numberStreet: z.string(),
    buildingSection: z.string().optional(),
    numberApartment: z.string().optional(),
    lobby: z.string().optional(),
    floor: z.string().optional(),
    statusAddress: z.string().optional(),
    source: z.string(),
    comments: z.string().optional(),

})

const ModalCreateClient = ({isOpen, onOpenWindow}: ModalCreateClientProps) => {
const [createClient] = useCreateClientMutation()
    const {control, handleSubmit, reset} = useForm<FormDataAddClient>({
        defaultValues: {
            name: '',
            buildingSection: '',
            city: '',
            code: '',
            comments: '',
            floor: '',
            lobby: '',
            numberApartment: '',
            numberStreet: '',
            phone:'',
            source: '',
            statusAddress: '',
            street: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(loginSchema),
    })
    const onSubmitHandler = async (dateForm: FormDataAddClient) => {
        console.log(dateForm)
        const {name,street,numberStreet,numberApartment,source,lobby,phone,floor,
        comments,code,city,buildingSection} = dateForm
        const body: CreateClientBody = {
            name,
            phones: [{nameUserPhone: "", tel: phone}],
            comments:[comments],
            source: source,
            addresses:[{
                numberStreet,
                street,
                city,
                buildingSection,
                code,
                floor,
                lobby,
                numberApartment,
            }]
        }
        createClient(body)
        reset()
        onOpenWindow()
    }
    return <Modal open={isOpen} title={'Создать клиента'} onOpenChange={onOpenWindow}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <ModalWithContent>
                <ControlledInput
                    className={s.input}
                    control={control}
                    name={'name'}
                    label={'ФИО'}
                />
                <Typography className={s.title} variant={'h3'}>Адрес :</Typography>
                <div>
                    <div className={s.adress}>
                        <ControlledInput
                            className={s.inputAddress}
                            control={control}
                            name={'city'}
                            label={'Город'}
                        />
                        <ControlledInput
                            className={s.inputAddress}
                            control={control}
                            name={'street'}
                            label={'Улица'}
                        />
                        <ControlledInput
                            className={s.inputAddress}
                            control={control}
                            type={'number'}
                            name={'numberStreet'}
                            label={'№ Дом'}
                        />

                    </div>

                    <div className={s.adress}>
                        <ControlledInput
                            className={s.inputAddress}
                            control={control}
                            name={'numberApartment'}
                            type={'number'}
                            label={'№-кв'}
                        />
                        <ControlledInput
                            className={s.inputAddress}
                            control={control}
                            name={'buildingSection'}
                            type={'number'}
                            label={'Корпус'}
                        />
                        <ControlledInput
                            className={s.inputAddress}
                            control={control}
                            name={'lobby'}
                            type={'number'}
                            label={'Подъезд'}
                        />
                        <ControlledInput
                            className={s.inputAddress}
                            control={control}
                            name={'floor'}
                            type={'number'}
                            label={'Этаж'}
                        />
                        <ControlledInput
                            className={s.inputAddress}
                            control={control}
                            name={'code'}

                            label={'Домофон'}
                        />

                    </div>
                    <ControlledInput
                        name="source"
                        control={control}
                        label="Источник"
                        className={s.inputAddress}
                    />
                    <ControlledInput
                        className={s.inputAddress}
                        control={control}
                        name={'phone'}
                        label={'Телефон: пример - +375290000000'}
                    />
                    <ControlledInput
                        className={s.inputAddress}
                        control={control}
                        name={'comments'}
                        label={'Примечания'}
                    />
                </div>

            </ModalWithContent>
            <ModalWithButton onClickSecondaryButton={() => onOpenWindow()} titleButton={'Создать'} secondaryTitle={'Отменить'} />
        </form>

    </Modal>
}