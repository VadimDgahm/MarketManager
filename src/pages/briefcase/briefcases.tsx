import { useState } from "react";
import { useForm } from "react-hook-form";

import { ControlledInput } from "@/components/controlled/controlledInput/controlledInput";
import { Button } from "@/components/ui/button";
import { PlusSquareOutline } from "@/components/ui/icons/plus-square-outline/PlusSquareOutline";
import Modal from "@/components/ui/modal/modal";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import { Typography } from "@/components/ui/typography";
import { TableBriefcases } from "@/pages/briefcase/tableBriefcase/tableBriefcases";
import { useCreateBriefcaseMutation } from "@/services/briefcase/briefcase.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import s from "./briefcases.module.scss";
import { BriefcaseType } from "@/services/briefcase/briefcase.type";

export const Briefcases = () => {
  const [isOpen, setOpen] = useState(false);
  const [createBriefcase] = useCreateBriefcaseMutation();

  return (
    <div className={s.briefcase}>
      <Typography variant={"h1"}>Создание портфеля</Typography>
      <Button
        className={s.button}
        onClick={() => setOpen(true)}
        variant={"secondary"}
      >
        <PlusSquareOutline className={s.icon} /> Создать портфель на неделю{" "}
      </Button>
      <TableBriefcases />
      <ModalBriefcase
        isOpen={isOpen}
        onOpenWindow={setOpen}
        onSubmitBriefcase={(body) => createBriefcase(body)}
      />
    </div>
  );
};

const loginSchema = z.object({
  name: z.string().min(3, "Минимум 3 символа").max(3000, "Слишком большое имя"),
});

type ModalCreateBriefcaseProps = {
  isOpen: boolean;
  onOpenWindow: (open: boolean) => void;
  briefcase?: BriefcaseType;
  onSubmitBriefcase: (body: FormDataAddBriefcase) => void;
};
type FormDataAddBriefcase = {
  name: string;
};
export const ModalBriefcase = ({
  isOpen,
  onOpenWindow,
  briefcase,
  onSubmitBriefcase,
}: ModalCreateBriefcaseProps) => {
  const { control, handleSubmit, reset } = useForm<FormDataAddBriefcase>({
    defaultValues: {
      name: briefcase?.name || "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const onSubmitHandler = async (dateForm: FormDataAddBriefcase) => {
    onSubmitBriefcase(dateForm);
    briefcase ? reset(dateForm) : reset();
    onOpenWindow(false);
  };

  return (
    <Modal
      onOpenChange={onOpenWindow}
      open={isOpen}
      title={briefcase ? "Редактировать портфель" : "Создать портфель"}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <ModalWithContent>
          <ControlledInput
            className={s.input}
            control={control}
            label={"Название"}
            name={"name"}
          />
        </ModalWithContent>
        <ModalWithButton
          onClickSecondaryButton={() => onOpenWindow(false)}
          secondaryTitle={"Отменить"}
          titleButton={briefcase ? "Изменить" : "Создать"}
        />
      </form>
    </Modal>
  );
};
