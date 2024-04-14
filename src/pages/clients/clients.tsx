import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ControlledInput } from "@/components/controlled/controlledInput/controlledInput";
import { Button } from "@/components/ui/button";
import { PersonAddOutline } from "@/components/ui/icons/person-add-outline/PersonAddOutline";
import Modal from "@/components/ui/modal/modal";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";
import { TableClients } from "@/pages/clients/tableClients/tableClients";
import {
  useCreateClientMutation,
  useFindClientsQuery,
} from "@/services/clients/clients.services";
import { CreateClientBody } from "@/services/clients/clientsServicesType";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import s from "./clients.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";

import { Pagination } from "@/components/ui/pagination";

export const Clients = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isOpen, setOpen] = useState(false);
  const [params, setParams] = useState({ search: "", page: 1, pageSize: 10 });
  const [searchValueInput, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const [idTime, setIdTime] = useState<any>("");
  const { data, error, isLoading } = useFindClientsQuery(params);
  const [page, setPage] = useState<number | string>(1);
  const [pageSize, setPageSize] = useState<number | string>(10);

  useEffect(() => {
    const searchValue = queryParams.get("search");
    setParams({
      search: searchValue || "",
      page: +page,
      pageSize: +pageSize,
    });
    if (!searchValue) {
      navigate("");
    }
  }, [location.search, page, pageSize]);

  // @ts-ignore
  if (error?.status === 403) {
    navigate("/activation");
  }
  const onChangeValueSearch = (value: string) => {
    setSearchValue(value);
    clearTimeout(idTime);
    const id = setTimeout(() => {
      queryParams.set("search", value);
      navigate(`?${queryParams.toString()}`);
    }, 500);
    setIdTime(id);
  };
  const onChangePageSize = (value: string | number) => {
    queryParams.set("pageSize", value.toString());
    setPageSize(value);
  };
  const onPageChange = (value: string | number) => {
    queryParams.set("page", value.toString());
    setPage(value);
  };

  if (isLoading) return <div>....Loading</div>;
  return (
    <div className={s.clientsContainer}>
      <div className={s.button}>
        <Button onClick={() => setOpen(true)} variant={"secondary"}>
          <PersonAddOutline className={s.iconAdd} />
          Создать клиента
        </Button>

        <ModalCreateClient
          isOpen={isOpen}
          onOpenWindow={() => setOpen(false)}
        />
      </div>
      <div className={s.search}>
        <Input
          value={searchValueInput}
          label={"Поиск"}
          type={"search"}
          onValueChange={onChangeValueSearch}
        />
      </div>
      {data.clients.length ? (
        <TableClients data={data.clients} />
      ) : (
        <div className={s.list}>Список пуст</div>
      )}

      <Pagination
        availablePageSizes={[10, 20, 30]}
        currentPage={+page}
        pageSize={+pageSize}
        totalCount={data.totalCount ? data.totalCount : 0}
        onChangePageSize={onChangePageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
};

type ModalCreateClientProps = {
  isOpen: boolean;
  onOpenWindow: () => void;
};
type FormDataAddClient = {
  buildingSection: string;
  city: string;
  code: string;
  comments: string;
  floor: string;
  lobby: string;
  name: string;
  numberApartment: string;
  numberStreet: string;
  phone: string;
  source: string;
  statusAddress: string;
  street: string;
};

const loginSchema = z.object({
  comments: z.string().optional(),
  name: z.string().min(3, "Минимум 3 символа").max(3000, "Слишком большое имя"),
  phone: z
    .string()
    .regex(
      /^\+375\s?\(?17|25|29|33|44\)?\s?\d{3}-\d{2}-\d{2}$/,
      "Неверный формат номера телефона Беларуси"
    ),
});

export const ModalCreateClient = ({
  isOpen,
  onOpenWindow,
}: ModalCreateClientProps) => {
  const [createClient] = useCreateClientMutation();
  const { control, handleSubmit, reset } = useForm<FormDataAddClient>({
    defaultValues: {
      name: "",
      phone: "",
      comments: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const onSubmitHandler = async (dateForm: FormDataAddClient) => {
    const { comments, name, phone } = dateForm;
    const body: CreateClientBody = {
      comments: [comments],
      name,
      phones: [
        { idPhone: uuidv4(), nameUserPhone: "Номер клиента", tel: phone },
      ],
    };

    createClient(body);
    reset();
    onOpenWindow();
  };

  return (
    <Modal onOpenChange={onOpenWindow} open={isOpen} title={"Создать клиента"}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <ModalWithContent>
          <ControlledInput
            className={s.input}
            control={control}
            label={"ФИО"}
            name={"name"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Телефон: пример - +375290000000"}
            name={"phone"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Примечания"}
            name={"comments"}
          />
        </ModalWithContent>
        <ModalWithButton
          onClickSecondaryButton={() => onOpenWindow()}
          secondaryTitle={"Отменить"}
          titleButton={"Создать"}
        />
      </form>
    </Modal>
  );
};
