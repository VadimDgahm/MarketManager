import Modal from "@/components/ui/modal/modal";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import {useGetTotalWeightQuery} from "@/services/invoices/invoices.services";
import {Loader} from "@/components/ui/loader/loader";
import {Table} from "@/components/ui/table/Table";
import s from "@/pages/briefcase/briefcase/table/tableOrder/tableOrder.module.scss";
import sm from "./totalWeightModal.module.scss";

type PropsType = {
  open: boolean,
  briefcaseId: string,
  setOpen: (isOpen: boolean) => void
};

export const TotalWeightModal = ({briefcaseId, open, setOpen}: PropsType) => {
  const {data, isLoading} = useGetTotalWeightQuery({briefcaseId});

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <Modal onOpenChange={setOpen} open={open} title="Общий вес по маршруту">
      <ModalWithContent className={sm.content}>
        <Table.Root className={s.table} id={"orders-table"}>
          <Table.Head>
            <Table.Row>
              <Table.Cell variant={"head"}>№</Table.Cell>
              <Table.Cell variant={"head"}>Позиция</Table.Cell>
              <Table.Cell variant={"head"}>Вес, кг</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.keys(data).map((key, index) => (
              <Table.Row key={key}>
                <Table.Cell>{++index}</Table.Cell>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{data[key].toFixed(2)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </ModalWithContent>
    </Modal>
  );
};
