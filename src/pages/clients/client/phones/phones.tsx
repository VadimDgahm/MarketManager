import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircleOutline } from "@/components/ui/icons/plus-circle-outline/PlusCircleOutline";
import { TrashOutline } from "@/components/ui/icons/trash-outline/TrashOutline";
import { Typography } from "@/components/ui/typography";
import { FormForPhone } from "@/pages/clients/client/formForPhone/formForPhone";
import { PhoneClient } from "@/services/clients/clientsServicesType";
import { useRemovePhoneMutation } from "@/services/phone/phone.services";

import s from "./phones.module.scss";

type AddressesProps = {
  data: PhoneClient[];
};
export const Phones = ({ data }: AddressesProps) => {
  const param = useParams();
  const [isOpenFormPhone, setIsOpenFormPhone] = useState(false);
  const [removePhoneClient] = useRemovePhoneMutation();
  const removePhone = (idPhone: string) => {
    removePhoneClient({ idClient: param.id, idPhone });
  };

  return (
    <Card className={s.boxTel}>
      <Typography className={s.text} variant={"body1"}>
        Телефоны:
      </Typography>
      <div>
        {data.length ? (
          <div>
            {data.map((el, i) => (
              <div className={s.tab} key={i}>
                <Typography key={i} variant={"body1"}>
                  {el.tel}
                  {el.nameUserPhone && ` - ${el.nameUserPhone}`}
                </Typography>
                <TrashOutline
                  className={s.iconTrash}
                  onClick={() => removePhone(el.idPhone)}
                />
              </div>
            ))}
          </div>
        ) : (
          <Typography className={s.text} variant={"body2"}>
            Нет номера
          </Typography>
        )}
      </div>
      <FormForPhone
        idClient={param.id}
        isOpen={isOpenFormPhone}
        onOpenWindow={() => setIsOpenFormPhone(false)}
      />
      <Button
        className={s.iconPlus}
        onClick={() => setIsOpenFormPhone(true)}
        variant={"tertiary"}
      >
        <PlusCircleOutline height={22} width={22} />
      </Button>
    </Card>
  );
};
