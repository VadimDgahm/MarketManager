import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DeleteModal } from "@/components/ui/delete-modal/deleteModal";
import { Instagram } from "@/components/ui/icons/instagram/instagram";
import { Kufar } from "@/components/ui/icons/kufar/kufar";
import {
  SmailFalse,
  SmailNew,
  SmailTrue,
} from "@/components/ui/icons/smail/smail";
import { Telegram } from "@/components/ui/icons/telegramm/telegram";
import { Viber } from "@/components/ui/icons/viber/viber";
import { Table } from "@/components/ui/table/Table";
import { CellVariant } from "@/components/ui/table/TableCellVariant/TableCellVariant";
import {
  useFindClientsQuery,
  useRemoveClientByIdMutation,
} from "@/services/clients/clients.services";
import { ClientType } from "@/services/clients/clientsServicesType";

import s from "./tableClients.module.scss";

export const TableClients = () => {
  return (
    <Table.Root>
      <ContentTableHead />
      <ContentTableBody />
    </Table.Root>
  );
};

const ContentTableHead = () => {
  return (
    <Table.Head>
      <Table.Row>
        <Table.Cell variant={"head"}></Table.Cell>
        <Table.Cell variant={"head"}>ФИО</Table.Cell>
        <Table.Cell variant={"head"}>Номер телефона</Table.Cell>
        <Table.Cell variant={"head"}>Адрес</Table.Cell>
        <Table.Cell variant={"head"}>Источник</Table.Cell>
        <Table.Cell variant={"head"}>Дата последнего заказа</Table.Cell>
        <Table.Cell variant={"head"}>Примечания</Table.Cell>
        <Table.Cell variant={"head"}></Table.Cell>
      </Table.Row>
    </Table.Head>
  );
};

const ContentTableBody = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean[]>([]);
  const { data, error } = useFindClientsQuery({});
  const [removeClient] = useRemoveClientByIdMutation();

  const navigate = useNavigate();

  // @ts-ignore
  if (error?.status === 403) {
    navigate("/activation");
  }
  const clickHandlerCellName = (id: string) => {
    navigate(`/clients/${id}`);
  };
  const removeClientHandler = (id: string, index: number) => {
    removeClient({ id });
    setIsOpenModal((prev) => {
      const updatedModalState = [...prev];

      updatedModalState[index] = false;

      return updatedModalState;
    });
  };

  return (
    <Table.Body>
      {data?.map((client: ClientType, index: number) => (
        <Table.Row key={client.id}>
          <Table.Cell>
            <div className={s.status}>
              {client.status === "постоянный" ? (
                <SmailTrue color={"#4ca657"} />
              ) : client.status === "новый" ? (
                <SmailNew />
              ) : (
                <SmailFalse color={"#db6363"} />
              )}
            </div>
          </Table.Cell>
          <Table.Cell
            className={s.linkClient}
            onClick={() => clickHandlerCellName(client.id)}
          >
            {client.name}
          </Table.Cell>
          <Table.Cell>
            <CellVariant.Phones data={client.phones} />
          </Table.Cell>
          <Table.Cell>
            <CellVariant.Addresses data={client.addresses} />
          </Table.Cell>
          <Table.Cell>
            {client.source === "Телеграмм" && <Telegram />}
            {client.source === "Вайбер" && <Viber />}
            {client.source === "Куфар" && <Kufar />}
            {client.source === "Инстаграм" && <Instagram />}
            {client.source === "неопределен" && <div>{client.source}</div>}
          </Table.Cell>
          <Table.Cell>
            {!client.dateLastOrder ? "нет заказа" : client.dateLastOrder}
          </Table.Cell>
          <Table.Cell>
            {client.comments.length && client.comments[0]}
          </Table.Cell>
          <Table.Cell>
            <CellVariant.EditAndTrash
              onClickEdit={() => {}}
              onClickTrash={() => {
                setIsOpenModal((prev) => {
                  const updatedModalState = [...prev];

                  updatedModalState[index] = true;

                  return updatedModalState;
                });
              }}
            />
            <DeleteModal
              name={client.name}
              open={isOpenModal[index]}
              removeHandler={function () {
                removeClientHandler(client.id, index);
              }}
              setOpen={(isOpen) =>
                setIsOpenModal((prev) => {
                  const updatedModalState = [...prev];

                  updatedModalState[index] = isOpen;

                  return updatedModalState;
                })
              }
              title={"Удаление клиента"}
            />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};
