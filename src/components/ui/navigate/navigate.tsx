import s from "./navigate.module.scss";
import {NavLink} from 'react-router-dom';
export const Navigate = () => {
  return <div className={s.navigate}>
    <NavLink to={'/clients'}>Клиенты</NavLink>
  </div>;
};
