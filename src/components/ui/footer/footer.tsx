import s from "./footer.module.scss";
import {useNavigate} from "react-router-dom";
export const Footer = () => {
  const navigate = useNavigate();

  return <footer className={s.footer}><span onClick={() => navigate('/private-report')}>© 2024 YARAKHOVICH</span></footer>;
};
