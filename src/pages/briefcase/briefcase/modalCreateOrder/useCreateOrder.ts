import { useState } from "react";

import {
  OrderClientType,
  OrderType,
} from "@/pages/briefcase/briefcase/modalCreateOrder/modalCreateOrder";
import { ClientType } from "@/services/clients/clientsServicesType";

type PropsType = {
  onOpenWindow: (open: boolean) => void;
  setResult: (body: OrderClientType) => void;
};
export const useCreateOrder = ({ onOpenWindow, setResult }: PropsType) => {
  const [client, setClient] = useState<ClientType | undefined>(undefined);

  const [arrProductsForClient, setArrProductsForClient] = useState<OrderType[]>(
    [],
  );

  const onSubmitHandler = () => {
    if (client) {
      const body = {
        idClient: client.id,
        orders: arrProductsForClient,
      };

      setArrProductsForClient([]);
      setResult(body);
    }
    onOpenWindow(false);
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
  };
};
