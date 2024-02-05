import { FC } from "react";

import { Button } from "@/components/ui/button";

import s from "./modalWithButton.module.scss";

type ModalWithButtonProps = {
  className?: string;
  onClickPrimaryButton?: () => void;
  onClickSecondaryButton?: () => void;
  secondaryTitle?: string;
  titleButton: string;
};
const ModalWithButton: FC<ModalWithButtonProps> = ({
  className,
  onClickPrimaryButton,
  onClickSecondaryButton,
  secondaryTitle = "Отмена",
  titleButton,
}) => {
  return (
    <div className={`${s.content} ${className}`}>
      {secondaryTitle && (
        <div>
          <Button
            className={s.buttonSecondary}
            onClick={onClickSecondaryButton}
            variant={"secondary"}
          >
            {secondaryTitle}
          </Button>
        </div>
      )}
      <div>
        <Button
          className={s.button}
          onClick={onClickPrimaryButton}
          type={"submit"}
        >
          {titleButton}
        </Button>
      </div>
    </div>
  );
};

export default ModalWithButton;
