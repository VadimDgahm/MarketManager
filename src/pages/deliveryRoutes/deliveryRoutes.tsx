import s from "@/pages/briefcase/briefcases.module.scss";
import {Typography} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {PlusSquareOutline} from "@/components/ui/icons/plus-square-outline/PlusSquareOutline";
import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Modal from "@/components/ui/modal/modal";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import {ControlledInput} from "@/components/controlled/controlledInput/controlledInput";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import {useCreateRouteMutation} from "@/services/deliveryRoutes/deliveryRoute.services";
import {DeliveryRouteType} from "@/services/deliveryRoutes/deliveryRoute.type";
import {TableDeliveryRoutes} from "@/pages/deliveryRoutes/tableDeliveryRoutes/tableDeliveryRoutes";

export const DeliveryRoutes = () => {
  const [isOpen, setOpen] = useState(false);
  const [createRoute] = useCreateRouteMutation();

  return (
    <div className={s.briefcase}>
      <Typography variant={"h1"}>Создание маршрутов</Typography>
      <Button
        className={s.button}
        onClick={() => setOpen(true)}
        variant={"secondary"}
      >
        <PlusSquareOutline className={s.icon}/> Создать маршрут на неделю
      </Button>
      <TableDeliveryRoutes />
      <ModalDeliveryRoute
        isOpen={isOpen}
        onOpenWindow={setOpen}
        onSubmitRoute={(body) => createRoute(body)}
      />
    </div>
  )
}

const loginSchema = z.object({
  name: z.string().min(3, "Минимум 3 символа").max(3000, "Слишком большое имя"),
});

type ModalCreateRoutesProps = {
  isOpen: boolean;
  onOpenWindow: (open: boolean) => void;
  route?: DeliveryRouteType;
  onSubmitRoute: (body: FormDataAddRoute) => void;
};
type FormDataAddRoute = {
  name: string;
};
export const ModalDeliveryRoute = ({
                                     isOpen,
                                     onOpenWindow,
                                     route,
                                     onSubmitRoute,
                                   }: ModalCreateRoutesProps) => {
  const {control, handleSubmit, reset} = useForm<FormDataAddRoute>({
    defaultValues: {
      name: route?.name || "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const onSubmitHandler = async (dateForm: FormDataAddRoute) => {
    onSubmitRoute(dateForm);
    route ? reset(dateForm) : reset();
    onOpenWindow(false);
  };

  return (
    <Modal
      onOpenChange={onOpenWindow}
      open={isOpen}
      title={route ? "Редактировать маршрут" : "Создать маршрут"}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <ModalWithContent>
          <ControlledInput
            className={s.input}
            control={control}
            label={"Название маршрута"}
            name={"name"}
          />
        </ModalWithContent>
        <ModalWithButton
          onClickSecondaryButton={() => onOpenWindow(false)}
          secondaryTitle={"Отменить"}
          titleButton={route ? "Изменить" : "Создать"}
        />
      </form>
    </Modal>
  );
};