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
  const [foundClients, setSearchClient] = useState<ResponseClients>({
    clients: [],
    totalCount: 0,
  });
  const [showTextNotFound, setShowTextNotFound] = useState(false);
  const [value, setValue] = useState("");
  const [idTime, setIdTime] = useState<any>();
  const { data } = useFindClientsQuery({ search: value });

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
  const onClickSearchClient = () => {
    setShowTextNotFound(true);

    setSearchClient(data);
  };
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
    onClickSearchClient,
    showTextNotFound,
  };
};
