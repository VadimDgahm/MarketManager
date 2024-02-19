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

  const [arrProductsForClient, setArrProductsForClient] = useState<OrderType[]>(
    [],
  );

  const onSubmitHandler = () => {
    if (client) {
      const body = {
        clientName: client.name,
        idClient: client.id,
        orders: arrProductsForClient,
      };

      setResult(body);
      setArrProductsForClient([]);
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
