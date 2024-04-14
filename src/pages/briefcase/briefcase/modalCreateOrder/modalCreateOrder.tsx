import Modal from "@/components/ui/modal/modal";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import { ChoiceClientComponent } from "@/pages/briefcase/briefcase/choiceClient/choiceClientComponent";
import { BasketClient } from "@/pages/briefcase/briefcase/modalCreateOrder/basket/basket";
import { FormOrderClient } from "@/pages/briefcase/briefcase/modalCreateOrder/formOrderClient/formOrderClient";
import { useCreateOrder } from "@/pages/briefcase/briefcase/modalCreateOrder/useCreateOrder";
import { OrderType } from "@/services/briefcase/briefcase.type";
import s from "@/pages/clients/clients.module.scss";
import { Button } from "@/components/ui/button";
import { PersonAddOutline } from "@/components/ui/icons/person-add-outline/PersonAddOutline";
import { ModalCreateClient } from "@/pages/clients/clients";
import { useState } from "react";
import { TabSwitcher } from "@/components/ui/tabSwitcher";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/typography";
import { useNavigate } from "react-router-dom";

export type OrderClientType = {
  idClient: string;
  orders: OrderType[];
};
type ModalCreateBriefcaseProps = {
  isOpen: boolean;
  onOpenWindow: (open: boolean) => void;
  setResult: (body: OrderClientType) => void;
};

export const ModalCreateOrder = ({
  isOpen,
  onOpenWindow,
  setResult,
}: ModalCreateBriefcaseProps) => {
  const {
    arrProductsForClient,
    client,
    handleClientChange,
    onSubmitHandler,
    setArrProductsForClient,
    setTimeDelivery,
    setDayDelivery,
    dayDelivery,
    timeDelivery,
    setAddressId,
    addressId,
    errorAddress,
  } = useCreateOrder({ onOpenWindow, setResult });

  const [isOpenCreateClientWindow, seIsOpenCreateClientWindow] =
    useState(false);
  const navigate = useNavigate();
  return (
    <Modal onOpenChange={onOpenWindow} open={isOpen} title={"Создать заказ"}>
      <ModalWithContent>
        <div className={s.button}>
          {!client && (
            <Button
              onClick={() => seIsOpenCreateClientWindow(true)}
              variant={"secondary"}
            >
              <PersonAddOutline />
            </Button>
          )}

          <ModalCreateClient
            isOpen={isOpenCreateClientWindow}
            onOpenWindow={() => seIsOpenCreateClientWindow(false)}
          />
        </div>

        <ChoiceClientComponent client={client} setClient={handleClientChange} />

        {client && (
          <>
            <div className={s.clientAddresses}>
              {client?.addresses.length ? (
                client?.addresses.map((address, i) => (
                  <Typography
                    className={`${s.address} ${
                      addressId === address.idAddress ? s.done : s.red
                    }`}
                    variant={"body2"}
                    onClick={() => setAddressId(address.idAddress)}
                  >
                    {++i}.{address?.street} {address.numberStreet}
                  </Typography>
                ))
              ) : (
                <div>
                  <div>нет адрессов</div>
                  <Button onClick={() => navigate(`/clients/${client?.id}`)}>
                    Добавить аддрес
                  </Button>
                </div>
              )}
            </div>
            <FormOrderClient
              arrProductsForClient={arrProductsForClient}
              setArrProductsForClient={setArrProductsForClient}
            />
            <BasketClient
              arrProductsForClient={arrProductsForClient}
              setArrProductsForClient={setArrProductsForClient}
            />
            <div>
              <Typography variant={"subtitle2"}>Время</Typography>
              <TabSwitcher
                onValueChange={setDayDelivery}
                value={dayDelivery}
                valuesCollection={[
                  { location: "Пятница", value: "Пятница" },
                  { location: "Четверг", value: "Четверг" },
                  { location: "Неважно", value: "Неважно" },
                ]}
              />
              <Input
                className={s.inputWeight}
                label={"Время доставки"}
                onValueChange={setTimeDelivery}
                value={timeDelivery}
              />
            </div>
          </>
        )}
      </ModalWithContent>
      {errorAddress && (
        <Typography className={s.red}>НЕ ВЫБРАН АДРЕСС</Typography>
      )}
      <ModalWithButton
        disabled={!client?.addresses.length}
        onClickPrimaryButton={onSubmitHandler}
        onClickSecondaryButton={() => onOpenWindow(false)}
        secondaryTitle={"Отменить"}
        titleButton={"Создать"}
      />
    </Modal>
  );
};
