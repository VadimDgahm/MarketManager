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
import { Typography } from "@/components/ui/typography";
import { AddressClient } from "@/services/address/addressServicesType";
import { ChangeStatus } from "@/pages/clients/client/controlClient/controlClient";
import {
  collectionSource,
  collectionStatus,
} from "@/pages/clients/client/collection";

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
      {data.clients?.length ? (
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
  street: string;
};

const loginSchema = z.object({
  comments: z.string().optional(),
  name: z.string().min(3, "Минимум 3 символа").max(3000, "Слишком большое имя"),
  phone: z.string(),
  city: z.string(),
  street: z.string(),
  numberStreet: z.string(),
  numberApartment: z.string(),
  buildingSection: z.string(),
  lobby: z.string(),
  floor: z.string(),
  code: z.string(),
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
      city: "",
      street: "",
      numberStreet: "",
      numberApartment: "",
      buildingSection: "",
      lobby: "",
      floor: "",
      code: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const [status, setStatus] = useState("новый");
  const [source, setSource] = useState("неопределен");
  const changeStatus = (value: string) => {
    setStatus(value);
  };
  const changeSource = (value: string) => {
    setSource(value);
  };
  const onSubmitHandler = async (dateForm: FormDataAddClient) => {
    const {
      comments,
      name,
      phone,
      city,
      code,
      street,
      numberStreet,
      numberApartment,
      lobby,
      buildingSection,
      floor,
    } = dateForm;
    const addresses: AddressClient[] = [];
    // @ts-ignore
    if (
      city ||
      street ||
      numberStreet ||
      code ||
      numberApartment ||
      lobby ||
      buildingSection ||
      floor
    ) {
      addresses.push({
        idAddress: uuidv4(),
        city,
        code,
        street,
        numberStreet,
        numberApartment,
        lobby,
        buildingSection,
        floor,
      });
    }

    const body: CreateClientBody = {
      comments: [comments],
      name,
      phones: [
        { idPhone: uuidv4(), nameUserPhone: "Номер клиента", tel: phone },
      ],
      addresses,
      status,
      source,
    };

    createClient(body);
    reset();
    onOpenWindow();
  };

  return (
    <Modal
      className={s.modal}
      onOpenChange={onOpenWindow}
      open={isOpen}
      title={"Создать клиента"}
    >
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
            label={"Телефон"}
            name={"phone"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Примечания"}
            name={"comments"}
          />
        </ModalWithContent>
        <ModalWithContent className={s.address}>
          <Typography>Адресс</Typography>
        </ModalWithContent>
        <ModalWithContent className={s.address}>
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Город"}
            name={"city"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"-ул. -пр. -пер."}
            name={"street"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"№ Дом"}
            name={"numberStreet"}
            type={"number"}
          />
        </ModalWithContent>

        <ModalWithContent className={s.address}>
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"№-кв"}
            name={"numberApartment"}
            type={"number"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Корпус"}
            name={"buildingSection"}
            type={"number"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Подъезд"}
            name={"lobby"}
            type={"number"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Этаж"}
            name={"floor"}
            type={"number"}
          />
          <ControlledInput
            className={s.inputAddress}
            control={control}
            label={"Домофон"}
            name={"code"}
          />
        </ModalWithContent>
        <ModalWithContent>
          <ChangeStatus
            changeStatus={changeSource}
            collection={collectionSource}
            status={source}
          />
          <ChangeStatus
            changeStatus={changeStatus}
            collection={collectionStatus}
            status={status}
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
