import { useState } from "react";

import { useFindClientsQuery } from "@/services/clients/clients.services";
import { ClientType } from "@/services/clients/clientsServicesType";

type PropsType = {
  setClient: (client: ClientType | undefined) => void;
};
export const useChoiceClient = ({ setClient }: PropsType) => {
  const { data } = useFindClientsQuery({});

  const [foundClients, setSearchClient] = useState([]);
  const [showTextNotFound, setShowTextNotFound] = useState(false);
  const [value, setValue] = useState("");

  const onChangeInput = (value: string) => {
    setValue(value);
  };
  const onClickSearchClient = () => {
    setShowTextNotFound(true);
    const regex = new RegExp(value.trim(), "i");

    if (value.trim()) {
      const clientsFound = data.filter(
        (el: ClientType) =>
          regex.test(el.name) || regex.test(el.phones[0]?.tel),
      );

      setSearchClient(clientsFound);
    } else {
      setSearchClient([]);
    }
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
