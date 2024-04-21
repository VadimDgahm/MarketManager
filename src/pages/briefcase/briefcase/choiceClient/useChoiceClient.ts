import { useEffect, useState } from "react";

import { useFindClientsQuery } from "@/services/clients/clients.services";
import {
  ClientType,
  ResponseClients,
} from "@/services/clients/clientsServicesType";

type PropsType = {
  setClient: (client: ClientType | undefined) => void;
};
export const useChoiceClient = ({ setClient }: PropsType) => {
  const [value, setValue] = useState("");
  const { data } = useFindClientsQuery({ search: value, page: 1, pageSize: 5 });
  const [foundClients, setSearchClient] = useState<ResponseClients>({
    clients: [],
    totalCount: 0,
  });
  const [idTime, setIdTime] = useState<any>();

  const onChangeInput = (value: string) => {
    setValue(value);
  };
  useEffect(() => {
    clearTimeout(idTime);
    const id = setTimeout(() => {
      setSearchClient(data);
    }, 300);
    setIdTime(id);
  }, [value, data]);
  const choiceClient = (clientObj: ClientType) => {
    setClient(clientObj);
  };
  const cancelClient = () => {
    setClient(undefined);
  };

  return {
    cancelClient,
    choiceClient,
    foundClients,
    onChangeInput,
  };
};
