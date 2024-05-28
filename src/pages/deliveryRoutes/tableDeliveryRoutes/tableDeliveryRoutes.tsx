import {Table} from "@/components/ui/table/Table";
import s from "@/pages/briefcase/briefcases.module.scss";
import {useGetRouteQuery} from "@/services/deliveryRoutes/deliveryRoute.services";
import {DeliveryRouteRow} from "@/pages/deliveryRoutes/tableDeliveryRoutes/deliveryRouteRow/deliveryRouteRow";
import {editDRType} from "@/components/ui/deliveryRouteEditModal/deliveryRouteEditModal";

export type TableDeliveryRoutesProps = {
  btnHandler?: (deliveryId: editDRType) => void;
  btnName?: string;
};

export const TableDeliveryRoutes = ({btnHandler, btnName}: TableDeliveryRoutesProps) => {
  return (
    <Table.Root className={s.table}>
      <ContentTableHead isSetButton={!!btnName}/>
      <ContentTableBody btnHandler={btnHandler} btnName={btnName}/>
    </Table.Root>
  );
};

export type ContentTableHeadProps = {
  isSetButton: boolean;
};

const ContentTableHead = ({isSetButton}: ContentTableHeadProps) => {
  return (
    <Table.Head>
      <Table.Row>
        <Table.Cell variant={"head"}>Название маршрута</Table.Cell>
        <Table.Cell variant={"head"}>Дата создания</Table.Cell>
        <Table.Cell variant={"head"}></Table.Cell>
        {isSetButton ? <Table.Cell variant={"head"}></Table.Cell> : ''}
      </Table.Row>
    </Table.Head>
  );
};
const ContentTableBody = ({btnHandler, btnName}: TableDeliveryRoutesProps) => {
  const {data, isLoading} = useGetRouteQuery({});

  if (isLoading) {
    return <div>isLoading</div>;
  }

  return (
    <Table.Body>
      {data?.map((deliveryRoute: DeliveryRouteType) => (
        <DeliveryRouteRow key={deliveryRoute._id} deliveryRoute={deliveryRoute} btnHandler={btnHandler}
                          btnName={btnName}/>
      ))}
    </Table.Body>
  );
};

export type DeliveryRouteType = {
  _id: string;
  createdDate: string;
  name: string;
};
