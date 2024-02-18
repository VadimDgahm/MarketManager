import Modal from "@/components/ui/modal/modal";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import { ChoiceClientComponent } from "@/pages/briefcase/briefcase/choiceClient/choiceClientComponent";
import { BasketClient } from "@/pages/briefcase/briefcase/modalCreateOrder/basket/basket";
import { FormOrderClient } from "@/pages/briefcase/briefcase/modalCreateOrder/formOrderClient/formOrderClient";
import { useCreateOrder } from "@/pages/briefcase/briefcase/modalCreateOrder/useCreateOrder";
import { OrderType } from "@/services/briefcase/briefcase.type";

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
  } = useCreateOrder({ onOpenWindow, setResult });

  return (
    <Modal onOpenChange={onOpenWindow} open={isOpen} title={"Создать заказ"}>
      <ModalWithContent>
        <ChoiceClientComponent client={client} setClient={handleClientChange} />
        {client && (
          <>
            <FormOrderClient
              arrProductsForClient={arrProductsForClient}
              setArrProductsForClient={setArrProductsForClient}
            />
            <BasketClient
              arrProductsForClient={arrProductsForClient}
              setArrProductsForClient={setArrProductsForClient}
            />
          </>
        )}
      </ModalWithContent>
      <ModalWithButton
        onClickPrimaryButton={onSubmitHandler}
        onClickSecondaryButton={() => onOpenWindow(false)}
        secondaryTitle={"Отменить"}
        titleButton={"Создать"}
      />
    </Modal>
  );
};
