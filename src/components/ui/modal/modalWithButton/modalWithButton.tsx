import { FC } from "react";

import { Button } from "@/components/ui/button";

import s from "./modalWithButton.module.scss";

type ModalWithButtonProps = {
  className?: string;
  onClickPrimaryButton?: () => void;
  onClickSecondaryButton?: () => void;
  secondaryTitle?: string;
  titleButton: string;
  disabled?: boolean;
};
const ModalWithButton: FC<ModalWithButtonProps> = ({
  className,
  onClickPrimaryButton,
  onClickSecondaryButton,
  secondaryTitle = "Отмена",
  titleButton,
  disabled = false,
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
          disabled={disabled}
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
