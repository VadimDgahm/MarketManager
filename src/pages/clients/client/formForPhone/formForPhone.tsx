import { useForm } from "react-hook-form";

import { ControlledInput } from "@/components/controlled/controlledInput/controlledInput";
import Modal from "@/components/ui/modal/modal";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import { useCreatePhoneMutation } from "@/services/phone/phone.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import s from "./formForPhone.module.scss";

type ModalCreatePhoneProps = {
  idClient: string | undefined;
  isOpen: boolean;
  onOpenWindow: () => void;
};
type FormDataAddClientForPhone = {
  nameUserPhone: string;
  tel: string;
};
const _loginSchema = z.object({
  nameUserPhone: z.string().optional(),
  tel: z.string().optional(),
});

export const FormForPhone = ({
  idClient,
  isOpen,
  onOpenWindow,
}: ModalCreatePhoneProps) => {
  const [createPhone] = useCreatePhoneMutation();
  const { control, handleSubmit, reset } = useForm<FormDataAddClientForPhone>({
    defaultValues: {
      nameUserPhone: "",
      tel: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(_loginSchema),
  });
  const onSubmitHandler = (dateForm: FormDataAddClientForPhone) => {
    createPhone({ idClient, ...dateForm });
    onOpenWindow();
    reset();
  };

  return (
    <Modal onOpenChange={onOpenWindow} open={isOpen} title={"Добавить адрес"}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <ModalWithContent>
          <ControlledInput
            className={s.inputPhone}
            control={control}
            label={"Чей номер телефона?"}
            name={"nameUserPhone"}
          />
          <ControlledInput
            className={s.inputPhone}
            control={control}
            label={"Номер телефона"}
            name={"tel"}
          />
        </ModalWithContent>
        <ModalWithButton
          onClickSecondaryButton={() => onOpenWindow()}
          secondaryTitle={"Отменить"}
          titleButton={"Создать"}
        />
      </form>
    </Modal>
  );
};
