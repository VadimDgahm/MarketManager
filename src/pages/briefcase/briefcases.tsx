import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {ControlledInput} from '@/components/controlled/controlledInput/controlledInput';
import {Button} from '@/components/ui/button';
import {PlusSquareOutline} from '@/components/ui/icons/plus-square-outline/PlusSquareOutline';
import Modal from '@/components/ui/modal/modal';
import ModalWithButton from '@/components/ui/modal/modalWithButton/modalWithButton';
import ModalWithContent from '@/components/ui/modal/modalWithContent/modalWithContent';
import {useCreateBriefcaseMutation,} from '@/services/briefcase/briefcase.services';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {TableBriefcases} from '@/pages/briefcase/tableBriefcase/tableBriefcases';
import s from './briefcases.module.scss'
import {Typography} from '@/components/ui/typography';

export const Briefcases = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className={s.briefcase}>
            <Typography variant={'h1'}>Создание портфеля</Typography>
            <Button className={s.button} onClick={() => setOpen(true)} variant={'secondary'}>
                <PlusSquareOutline className={s.icon}/> Создать портфель на неделю{' '}
            </Button>
            <TableBriefcases/>
            <ModalCreateBriefcase isOpen={isOpen} onOpenWindow={setOpen}/>
        </div>
    );
};

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
const ModalCreateBriefcase = ({isOpen, onOpenWindow}: ModalCreateBriefcaseProps) => {
    const [createBriefcase] = useCreateBriefcaseMutation();
    const {control, handleSubmit, reset} = useForm<FormDataAddBriefcase>({
        defaultValues: {
            name: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(loginSchema),
    });
    const onSubmitHandler = async (dateForm: FormDataAddBriefcase) => {
        createBriefcase(dateForm);
        reset();
        onOpenWindow(false);
    };

    return (
        <Modal onOpenChange={onOpenWindow} open={isOpen} title={'Создать клиента'}>
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
    );
};
