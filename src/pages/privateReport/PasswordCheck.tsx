import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCheckPrivatePassMutation} from '@/services/privateReport/privateReport.service';
import {useDispatch} from 'react-redux';
import {setPrivatePassVerified} from '@/services/privateReport/privatePassSlice';
import style from "./privateReport.module.scss";
import {Button} from "@/components/ui/button";

export const PasswordCheck = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [checkPrivatePass] = useCheckPrivatePassMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(null);

        try {
            const result = await checkPrivatePass(password).unwrap();
            if (result.success) {
                dispatch(setPrivatePassVerified(true));
                navigate('/private-report');
            } else {
                alert('Неправильный пароль');
            }
        } catch (error) {
            console.log('Ошибка проверки пароля', error);
        }
    };
    console.log(password);
    return (
        <div>
            <form onSubmit={handleSubmit} className={style.privateReportForm}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите приватный пароль"
                />
                <Button type={"submit"}>Отправить</Button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};
