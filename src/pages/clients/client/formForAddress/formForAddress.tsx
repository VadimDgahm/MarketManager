import { useForm } from "react-hook-form";

import { ControlledInput } from "@/components/controlled/controlledInput/controlledInput";
import Modal from "@/components/ui/modal/modal";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import s from "./formForAddress.module.scss";
import { AddressClient } from "@/services/clients/clientsServicesType";

type ModalCreateAddressProps = {
  idClient: string | undefined;
  isOpen: boolean;
  onOpenWindow: () => void;
  onChangeHandler: (
    data: FormDataAddClientForAddress & { idClient: string | undefined }
  ) => void;
  data?: AddressClient;
};
export type FormDataAddClientForAddress = {
  buildingSection: string;
  city: string;
  code: string;
  floor: string;
  lobby: string;
  numberApartment: string;
  numberStreet: string;
  street: string;
};
const loginSchema = z.object({
  buildingSection: z.string().optional(),
  city: z.string().optional(),
  code: z.string().optional(),
  floor: z.string().optional(),
  lobby: z.string().optional(),
  numberApartment: z.string().optional(),
  numberStreet: z.string().optional(),
  street: z.string().optional(),
});

export const FormForAddress = ({
  idClient,
  isOpen,
  onOpenWindow,
  onChangeHandler,
  data,
}: ModalCreateAddressProps) => {
  const { control, handleSubmit, reset } = useForm<FormDataAddClientForAddress>(
    {
      defaultValues: {
        buildingSection: data?.buildingSection || "",
        city: data?.city || "",
        code: data?.code || "",
        floor: data?.floor || "",
        lobby: data?.lobby || "",
        numberApartment: data?.numberApartment || "",
        numberStreet: data?.numberStreet || "",
        street: data?.street || "",
      },
      mode: "onSubmit",
      resolver: zodResolver(loginSchema),
    }
  );
  const onSubmitHandler = (dateForm: FormDataAddClientForAddress) => {
    onOpenWindow();
    onChangeHandler({ idClient, ...dateForm });
    if (data) {
      reset(dateForm);
    }
    reset();
  };

  return (
    <Modal onOpenChange={onOpenWindow} open={isOpen} title={"Добавить адрес"}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <ModalWithContent className={s.address}>
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Город"}
            name={"city"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"-ул. -пр. -пер."}
            name={"street"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"№ Дом"}
            name={"numberStreet"}
            type={"number"}
          />
        </ModalWithContent>

        <ModalWithContent className={s.address}>
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"№-кв"}
            name={"numberApartment"}
            type={"number"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Корпус"}
            name={"buildingSection"}
            type={"number"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Подъезд"}
            name={"lobby"}
            type={"number"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Этаж"}
            name={"floor"}
            type={"number"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Домофон"}
            name={"code"}
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
