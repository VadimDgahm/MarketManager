import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DeleteModal } from "@/components/ui/delete-modal/deleteModal";
import { TrashIcon } from "@/components/ui/icons/trash/TrashIcon";
import { TrashOutline } from "@/components/ui/icons/trash-outline/TrashOutline";
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data, error } = useFindClientsQuery({});
  const [removeClient] = useRemoveClientByIdMutation();

  const navigate = useNavigate();

  if (error?.status === 403) {
    navigate("/activation");
  }
  const clickHandlerCellName = (id: string) => {
    navigate(`/clients/${id}`);
  };
  const removeClientHandler = (id: string) => {
    removeClient({ id });
    setIsOpenModal(false);
  };

  return (
    <Table.Body>
      {data?.map((client: ClientType) => (
        <Table.Row key={client.id}>
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
          <Table.Cell>{client.source}</Table.Cell>
          <Table.Cell>{!client.dateLastOrder && "нет заказа"}</Table.Cell>
          <Table.Cell>
            {client.comments.length && client.comments[0]}
          </Table.Cell>
          <Table.Cell>
            <CellVariant.EditAndTrash
              onClickEdit={() => {}}
              onClickTrash={() => setIsOpenModal(true)}
            />
            <DeleteModal
              name={client.name}
              open={isOpenModal}
              removeHandler={() => removeClientHandler(client.id)}
              setOpen={setIsOpenModal}
              title={"Удаление клиента"}
            />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};
