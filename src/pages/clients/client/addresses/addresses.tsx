import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircleOutline } from "@/components/ui/icons/plus-circle-outline/PlusCircleOutline";
import { TrashOutline } from "@/components/ui/icons/trash-outline/TrashOutline";
import { Typography } from "@/components/ui/typography";
import {
  FormDataAddClientForAddress,
  FormForAddress,
} from "@/pages/clients/client/formForAddress/formForAddress";
import {
  useCreateAddressMutation,
  useRemoveAddressMutation,
  useUpdateAddressMutation,
} from "@/services/address/address.services";
import { AddressClient } from "@/services/clients/clientsServicesType";

import s from "./addresses.module.scss";
import { FullAddress } from "@/pages/utils/addresses";
import { EditIcon } from "@/components/ui/icons/edit/EditIcon";

type AddressesProps = {
  data: AddressClient[];
};
export const Addresses = ({ data }: AddressesProps) => {
  const [isOpenFormAddress, setIsOpenFormAddress] = useState(false);
  const param = useParams();
  const [createAddress] = useCreateAddressMutation();

  return (
    <Card className={s.card}>
      <Typography className={s.text} variant={"body1"}>
        Адресса:
      </Typography>
      <div className={s.address}>
        {data.length ? (
          <div>
            {data.map((el, i) => {
              return <DataAddress key={el.idAddress} address={el} index={i} />;
            })}
          </div>
        ) : (
          <Typography className={s.text} variant={"body2"}>
            Нет адреса
          </Typography>
        )}

        <FormForAddress
          onChangeHandler={(data) => createAddress(data)}
          idClient={param.id}
          isOpen={isOpenFormAddress}
          onOpenWindow={() => setIsOpenFormAddress(false)}
        />
      </div>

      <Button
        className={s.iconPlus}
        onClick={() => setIsOpenFormAddress(true)}
        variant={"tertiary"}
      >
        <PlusCircleOutline height={22} width={22} />
      </Button>
    </Card>
  );
};

type TDataAddressProps = {
  address: AddressClient;
  index: number;
};
const DataAddress = ({ address, index }: TDataAddressProps) => {
  const [removeAddressClient] = useRemoveAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const param = useParams();
  const [isOpenFormAddress, setIsOpenFormAddress] = useState(false);
  const removeAddress = (idAddress: string) => {
    removeAddressClient({ idAddress, idClient: param.id });
  };
  const editAddress = (
    data: FormDataAddClientForAddress & { idClient: string | undefined }
  ) => {
    updateAddress({ ...data, idAddress: address.idAddress });
  };
  return (
    <div className={s.addressData}>
      <Typography key={index} variant={"body1"}>
        {++index}. <FullAddress address={address} />
      </Typography>
      <div>
        <EditIcon
          className={s.iconEdit}
          onClick={() => setIsOpenFormAddress(true)}
        />
        <TrashOutline
          className={s.iconTrash}
          onClick={() => removeAddress(address.idAddress)}
        />
      </div>
      <FormForAddress
        onChangeHandler={editAddress}
        idClient={param.id}
        isOpen={isOpenFormAddress}
        data={address}
        onOpenWindow={() => setIsOpenFormAddress(false)}
      />
    </div>
  );
};
