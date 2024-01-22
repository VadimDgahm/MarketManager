import { CellVariant } from "@/components/ui/table/TableCellVariant/TableCellVariant";
import { useRemoveClientByIdMutation } from "@/services/clients/clients.services";

type ControlClientProps = {
  id: string;
};
export const ControlClient = ({ id }: ControlClientProps) => {
  const [removeClient] = useRemoveClientByIdMutation();

  return (
    <>
      <CellVariant.EditAndTrash
        onClickEdit={() => {}}
        onClickTrash={() => removeClient({ id })}
      />
    </>
  );
};
