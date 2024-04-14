import { useNavigate } from "react-router-dom";
import { Typography } from "@/components/ui/typography";
import s from "./goBack.module.scss";
import { ArrowBack } from "@/components/ui/icons/arrow-back/ArrowBack";
import { ArrowForward } from "@/components/ui/icons/arrow-forward/ArrowForward";
export const GoBackButton = () => {
  const history = useNavigate();

  const goBack = () => {
    history(-1);
  };
  return (
    <div className={s.content} onClick={goBack}>
      <ArrowBack />
      <Typography className={s.text}> Назад </Typography>
    </div>
  );
};

export const ForwardButton = () => {
  const history = useNavigate();

  const forward = () => {
    history(+1);
  };
  return (
    <div className={s.content} onClick={forward}>
      <Typography className={s.text}> Вперед </Typography>
      <ArrowForward />
    </div>
  );
};
