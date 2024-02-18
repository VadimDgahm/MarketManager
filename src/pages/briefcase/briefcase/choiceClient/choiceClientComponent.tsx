import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Close } from "@/components/ui/icons/close/Close";
import { Typography } from "@/components/ui/typography";
import { useChoiceClient } from "@/pages/briefcase/briefcase/choiceClient/useChoiceClient";
import { TableRowClient } from "@/pages/briefcase/briefcase/table/tableRowClient/tableRowClient";
import { ClientType } from "@/services/clients/clientsServicesType";

import s from "./choiceClient.module.scss";

type ChoiceClientComponentProps = {
  client: ClientType | undefined;
  setClient: (client: ClientType | undefined) => void;
};
export const ChoiceClientComponent = ({
  client,
  setClient,
}: ChoiceClientComponentProps) => {
  const {
    cancelClient,
    choiceClient,
    foundClients,
    onChangeInput,
    onClickSearchClient,
    showTextNotFound,
  } = useChoiceClient({ setClient });

  if (client) {
    return (
      <div className={s.clientName}>
        <Typography variant={"body2"}>Клиент - {client?.name}</Typography>
        <div onClick={cancelClient}>
          <Close width={18} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={s.inputWithButtonBox}>
        <Input
          className={s.inputSearch}
          label={"Поиск клиента"}
          onValueChange={onChangeInput}
          type={"search"}
        />
        <Button onClick={onClickSearchClient} variant={"tertiary"}>
          Поиск
        </Button>
      </div>
      <div>
        {foundClients.length
          ? foundClients.map((el: ClientType) => {
              return (
                <TableRowClient
                  key={el.id}
                  name={el.name}
                  onClick={() => choiceClient(el)}
                  phone={el.phones[0]?.tel}
                />
              );
            })
          : showTextNotFound && (
              <Typography variant={"subtitle2"}>Не найдено</Typography>
            )}
      </div>
    </>
  );
};
