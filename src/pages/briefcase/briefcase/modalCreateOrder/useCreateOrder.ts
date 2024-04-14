import { useState } from "react";

import { OrderClientType } from "@/pages/briefcase/briefcase/modalCreateOrder/modalCreateOrder";
import { OrderType } from "@/services/briefcase/briefcase.type";
import { ClientType } from "@/services/clients/clientsServicesType";

type PropsType = {
  onOpenWindow: (open: boolean) => void;
  setResult: (body: OrderClientType) => void;
};
export const useCreateOrder = ({ onOpenWindow, setResult }: PropsType) => {
  const [client, setClient] = useState<ClientType | undefined>(undefined);
  const [dayDelivery, setDayDelivery] = useState("Неважно");
  const [timeDelivery, setTimeDelivery] = useState("");
  const [arrProductsForClient, setArrProductsForClient] = useState<OrderType[]>(
    []
  );
  const [addressId, setAddressId] = useState("");

  const [errorAddress, setErrorAddress] = useState(false);

  const onSubmitHandler = () => {
    if (addressId) {
      if (client) {
        const body = {
          clientName: client.name,
          idClient: client.id,
          timeDelivery: timeDelivery,
          dayDelivery: dayDelivery,
          orders: arrProductsForClient,
          addressId: addressId,
        };

        setResult(body);
        setArrProductsForClient([]);
        setClient(undefined);
      }
      onOpenWindow(false);
    } else {
      setErrorAddress(true);
    }
  };

  const handleClientChange = (client: ClientType | undefined) => {
    {
      if (!client) {
        setArrProductsForClient([]);
      }
      setClient(client);
    }
  };

  return {
    arrProductsForClient,
    client,
    handleClientChange,
    onSubmitHandler,
    setArrProductsForClient,
    setDayDelivery,
    setTimeDelivery,
    dayDelivery,
    timeDelivery,
    addressId,
    setAddressId,
    errorAddress,
  };
};
