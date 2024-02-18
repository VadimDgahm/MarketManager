import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ActivationIcon } from "@/components/ui/icons/activationIcon/activationIcon";
import { Typography } from "@/components/ui/typography";

import s from "./activation.module.scss";

export const Activation = () => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const onClickHandlerActivation = () => {
    setIsClick(true);
  };

  return (
    <Card className={s.card}>
      {!isClick ? (
        <>
          <div>
            <Typography className={`${s.text} ${s.title}`} variant={"large"}>
              Регистрация прошла успешно!
            </Typography>
            <Typography className={`${s.text} ${s.subtitle}`} variant={"body2"}>
              Ваша учетная запись создана и требует подтверждения со стороны
              администратора для активации полного доступа к приложению
            </Typography>
          </div>
          <Button onClick={onClickHandlerActivation}>
            Запрос на Активацию!
          </Button>
        </>
      ) : (
        <div>
          <Typography variant={"large"}>Запрос отправлен</Typography>
          <ActivationIcon className={s.active} />
        </div>
      )}
    </Card>
  );
};
