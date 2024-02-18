import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircleOutline } from "@/components/ui/icons/plus-circle-outline/PlusCircleOutline";
import { TrashOutline } from "@/components/ui/icons/trash-outline/TrashOutline";
import { Typography } from "@/components/ui/typography";
import { FormForAddress } from "@/pages/clients/client/formForAddress/formForAddress";
import { useRemoveAddressMutation } from "@/services/address/address.services";
import { AddressClient } from "@/services/clients/clientsServicesType";

import s from "./addresses.module.scss";

type AddressesProps = {
  data: AddressClient[];
};
export const Addresses = ({ data }: AddressesProps) => {
  const [isOpenFormAddress, setIsOpenFormAddress] = useState(false);
  const param = useParams();
  const [removeAddressClient] = useRemoveAddressMutation();
  const removeAddress = (idAddress: string) => {
    removeAddressClient({ idAddress, idClient: param.id });
  };

  return (
    <Card className={s.card}>
      <Typography className={s.text} variant={"body1"}>
        Адресса:
      </Typography>
      <div className={s.address}>
        {data.length ? (
          <div>
            {data.map((el, i) => {
              const {
                buildingSection,
                city,
                code,
                floor,
                lobby,
                numberApartment,
                numberStreet,
                street,
              } = el;

              return (
                <div className={s.tab} key={i}>
                  <Typography key={i} variant={"body1"}>
                    {++i}. {city && `г.${city},`} {street && `ул.${street},`}
                    {numberStreet && `д.${numberStreet},`}
                    {buildingSection && `корпус${buildingSection},`}
                    {numberApartment && `кв.${numberApartment},`}
                    {lobby && `под.${lobby},`}
                    {floor && `$этаж.{floor},`}
                    {code && `код.${code}`}
                  </Typography>
                  <TrashOutline
                    className={s.iconTrash}
                    onClick={() => removeAddress(el.idAddress)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <Typography className={s.text} variant={"body2"}>
            Нет адреса
          </Typography>
        )}
        <FormForAddress
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
