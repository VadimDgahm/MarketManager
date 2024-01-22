import { Table } from "@/components/ui/table/Table";
import { CellVariant } from "@/components/ui/table/TableCellVariant/TableCellVariant";
import { ControlClient } from "@/pages/clients/client/controlClient/controlClient";
import { useFindClientsQuery } from "@/services/clients/clients.services";
import { ClientType } from "@/services/clients/clientsServicesType";
import {useNavigate} from 'react-router-dom';

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

      </Table.Row>
    </Table.Head>
  );
};

const ContentTableBody = () => {
  const { data } = useFindClientsQuery({});
  const navigate = useNavigate()
  const clickHandlerCellName = (id: string) => {
    navigate(`/clients/${id}`)
  }
  return (
    <Table.Body>
      {data?.map((client: ClientType) => (
        <Table.Row key={client.id}>
          <Table.Cell onClick={() => clickHandlerCellName(client.id)}>{client.name}</Table.Cell>
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
        </Table.Row>
      ))}
    </Table.Body>
  );
};
