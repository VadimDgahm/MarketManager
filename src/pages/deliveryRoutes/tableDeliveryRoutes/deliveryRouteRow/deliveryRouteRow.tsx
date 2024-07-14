import {Table} from "@/components/ui/table/Table";
import s from "@/pages/briefcase/tableBriefcase/tableBriefcases.module.scss";
import {Button} from "@/components/ui/button";
import {CellVariant} from "@/components/ui/table/TableCellVariant/TableCellVariant";
import {DeleteModal} from "@/components/ui/delete-modal/deleteModal";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {
  useRemoveRouteMutation,
  useUpdateRouteMutation,
} from "@/services/deliveryRoutes/deliveryRoute.services";
import {ModalDeliveryRoute} from "@/pages/deliveryRoutes/deliveryRoutes";
import {DeliveryRouteType} from "@/pages/deliveryRoutes/tableDeliveryRoutes/tableDeliveryRoutes";
import {editDRType} from "@/components/ui/deliveryRouteEditModal/deliveryRouteEditModal";

type DeliveryRouteRowProps = {
  deliveryRoute: DeliveryRouteType;
  btnHandler?: (deliveryId: editDRType) => void;
  btnName?: string;
};

export const DeliveryRouteRow = ({deliveryRoute, btnHandler, btnName}: DeliveryRouteRowProps) => {
  const navigate = useNavigate();
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenModalRemove, setIsOpenModalRemove] = useState<boolean>(false);
  const [removeDeliveryRoute] = useRemoveRouteMutation();
  const [updateDeliveryRoute] = useUpdateRouteMutation();

  return (
    <Table.Row key={deliveryRoute._id}>
      <Table.Cell
        className={s.linkBriefcase}
        onClick={() => navigate(`/deliveryRoutes/${deliveryRoute._id}`)}
      >
        {deliveryRoute.name}
      </Table.Cell>
      <Table.Cell>{deliveryRoute.createdDate}</Table.Cell>
      <Table.Cell>
        <Button onClick={() => navigate(`/invoices/${deliveryRoute._id}`)}>{"Счет - " + deliveryRoute.name}</Button>
      </Table.Cell>
      <Table.Cell>
        <CellVariant.EditAndTrash
          onClickEdit={() => setIsOpenEdit(true)}
          onClickTrash={() => setIsOpenModalRemove(true)}
        />
        <ModalDeliveryRoute
          isOpen={isOpenEdit}
          onOpenWindow={setIsOpenEdit}
          onSubmitRoute={(body) =>
            updateDeliveryRoute({
              _id: deliveryRoute._id,
              ...body,
            })
          }
          route={deliveryRoute}
        />
        <DeleteModal
          name={`маршрут - ${deliveryRoute.name}`}
          open={isOpenModalRemove}
          removeHandler={() => removeDeliveryRoute({_id: deliveryRoute._id})}
          setOpen={(isOpen) => setIsOpenModalRemove(isOpen)}
          title={"Удалить маршрут"}
        />
      </Table.Cell>
      {btnName ? <Table.Cell>
        <Button
          onClick={() => btnHandler ? btnHandler({
            _id: deliveryRoute._id,
            name: deliveryRoute.name,
            oldDeliveryRouteId: ''
          }) : ''}
          variant={"primary"}
          value={deliveryRoute._id}
        >{btnName}
        </Button>
      </Table.Cell> : ''}
    </Table.Row>
  );
};
