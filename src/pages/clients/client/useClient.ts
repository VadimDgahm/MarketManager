import { useParams } from "react-router-dom";

import { useUpdateClientMutation } from "@/services/clients/clients.services";
import { ClientTypeFilter } from "@/services/clients/clientsServicesType";

export const useClient = () => {
  const param = useParams();

  const [updateDataClient] = useUpdateClientMutation();

  const changeName = (value: string | undefined) => {
    const filter: ClientTypeFilter = {
      name: value,
    };

    updateDataClient({ filter, id: param.id });
  };
  const changeStatus = (value: string) => {
    const filter: ClientTypeFilter = {
      status: value,
    };

    updateDataClient({ filter, id: param.id });
  };
  const changeSource = (value: string | undefined) => {
    const filter: ClientTypeFilter = {
      source: value,
    };

    updateDataClient({ filter, id: param.id });
  };
  const changeComments = (value: string | undefined) => {
    const filter: ClientTypeFilter = {};
    if (value) {
      filter.comments = [value];
    } else {
      filter.comments = [""];
    }
    updateDataClient({ filter, id: param.id });
  };

  return {
    changeName,
    changeSource,
    changeStatus,
    param,
    changeComments,
  };
};
