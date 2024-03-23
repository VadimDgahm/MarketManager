import { useState } from "react";
import { useForm } from "react-hook-form";

import { ControlledInput } from "@/components/controlled/controlledInput/controlledInput";
import { Button } from "@/components/ui/button";
import { PersonAddOutline } from "@/components/ui/icons/person-add-outline/PersonAddOutline";
import Modal from "@/components/ui/modal/modal";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import { TableClients } from "@/pages/clients/tableClients/tableClients";
import { useCreateClientMutation } from "@/services/clients/clients.services";
import { CreateClientBody } from "@/services/clients/clientsServicesType";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
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
        <ModalCreateClient
          isOpen={isOpen}
          onOpenWindow={() => setOpen(false)}
        />
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
  comments: z.string().optional(),
  name: z.string().min(3, "Минимум 3 символа").max(3000, "Слишком большое имя"),
  phone: z
    .string()
    .regex(
      /^\+375\s?\(?17|25|29|33|44\)?\s?\d{3}-\d{2}-\d{2}$/,
      "Неверный формат номера телефона Беларуси"
    ),
});

const ModalCreateClient = ({
  isOpen,
  onOpenWindow,
}: ModalCreateClientProps) => {
  const [createClient] = useCreateClientMutation();
  const { control, handleSubmit, reset } = useForm<FormDataAddClient>({
    defaultValues: {
      name: "",
      phone: "",
      comments: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const onSubmitHandler = async (dateForm: FormDataAddClient) => {
    const { comments, name, phone } = dateForm;
    const body: CreateClientBody = {
      comments: [comments],
      name,
      phones: [
        { idPhone: uuidv4(), nameUserPhone: "Номер клиента", tel: phone },
      ],
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
