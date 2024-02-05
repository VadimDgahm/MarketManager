import { useState } from "react";
import { useForm } from "react-hook-form";

import { ControlledInput } from "@/components/controlled/controlledInput/controlledInput";
import { Button } from "@/components/ui/button";
import { PersonAddOutline } from "@/components/ui/icons/person-add-outline/PersonAddOutline";
import Modal from "@/components/ui/modal/modal";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import { Typography } from "@/components/ui/typography";
import { TableClients } from "@/pages/clients/tableClients/tableClients";
import { useCreateClientMutation } from "@/services/clients/clients.services";
import { CreateClientBody } from "@/services/clients/clientsServicesType";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import s from "./clients.module.scss";

export const Clients = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={s.clientsContainer}>
      <div className={s.button}>
        <Button onClick={() => setOpen(true)} variant={"secondary"}>
          <PersonAddOutline className={s.iconAdd} />
          Создать клиента
        </Button>
        <ModalCreateClient isOpen={isOpen} onOpenWindow={setOpen} />
      </div>
      <TableClients />
    </div>
  );
};

type ModalCreateClientProps = {
  isOpen: boolean;
  onOpenWindow: () => void;
};
type FormDataAddClient = {
  buildingSection: string;
  city: string;
  code: string;
  comments: string;
  floor: string;
  lobby: string;
  name: string;
  numberApartment: string;
  numberStreet: string;
  phone: string;
  source: string;
  statusAddress: string;
  street: string;
};

const loginSchema = z.object({
  buildingSection: z.string().optional(),
  city: z.string().optional(),
  code: z.string().optional(),
  comments: z.string().optional(),
  floor: z.string().optional(),
  lobby: z.string().optional(),
  name: z.string().min(3, "Минимум 3 символа").max(3000, "Слишком большое имя"),
  numberApartment: z.string().optional(),
  numberStreet: z.string(),
  phone: z
    .string()
    .regex(
      /^\+375\s?\(?17|25|29|33|44\)?\s?\d{3}-\d{2}-\d{2}$/,
      "Неверный формат номера телефона Беларуси",
    ),
  source: z.string(),
  statusAddress: z.string().optional(),
  street: z.string(),
});

const ModalCreateClient = ({
  isOpen,
  onOpenWindow,
}: ModalCreateClientProps) => {
  const [createClient] = useCreateClientMutation();
  const { control, handleSubmit, reset } = useForm<FormDataAddClient>({
    defaultValues: {
      buildingSection: "",
      city: "",
      code: "",
      comments: "",
      floor: "",
      lobby: "",
      name: "",
      numberApartment: "",
      numberStreet: "",
      phone: "",
      source: "",
      statusAddress: "",
      street: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const onSubmitHandler = async (dateForm: FormDataAddClient) => {
    const {
      buildingSection,
      city,
      code,
      comments,
      floor,
      lobby,
      name,
      numberApartment,
      numberStreet,
      phone,
      source,
      street,
    } = dateForm;
    const body: CreateClientBody = {
      addresses: [
        {
          buildingSection,
          city,
          code,
          floor,
          lobby,
          numberApartment,
          numberStreet,
          street,
        },
      ],
      comments: [comments],
      name,
      phones: [{ nameUserPhone: "", tel: phone }],
      source: source,
    };

    createClient(body);
    reset();
    onOpenWindow();
  };

  return (
    <Modal onOpenChange={onOpenWindow} open={isOpen} title={"Создать клиента"}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <ModalWithContent>
          <ControlledInput
            className={s.input}
            control={control}
            label={"ФИО"}
            name={"name"}
          />
          <Typography className={s.title} variant={"h3"}>
            Адрес :
          </Typography>
          <div>
            <div className={s.adress}>
              <ControlledInput
                className={s.inputAddress}
                control={control}
                label={"Город"}
                name={"city"}
              />
              <ControlledInput
                className={s.inputAddress}
                control={control}
                label={"Улица"}
                name={"street"}
              />
              <ControlledInput
                className={s.inputAddress}
                control={control}
                label={"№ Дом"}
                name={"numberStreet"}
                type={"number"}
              />
            </div>

            <div className={s.adress}>
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
            </div>
            <ControlledInput
              className={s.inputAddress}
              control={control}
              label={"Источник"}
              name={"source"}
            />
            <ControlledInput
              className={s.inputAddress}
              control={control}
              label={"Телефон: пример - +375290000000"}
              name={"phone"}
            />
            <ControlledInput
              className={s.inputAddress}
              control={control}
              label={"Примечания"}
              name={"comments"}
            />
          </div>
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
