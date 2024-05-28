import { ComponentProps, FC } from "react";

import { ArrowDown } from "@/components/ui/icons/arrowDown/ArrowDown";
import { ArrowUp } from "@/components/ui/icons/arrowUp/ArrowUp";
import { EditOutline } from "@/components/ui/icons/edit-outline/EditOutline";
import { PhoneIcon } from "@/components/ui/icons/phone/phone";
import { PlayCircleOutline } from "@/components/ui/icons/play-circle-outline/PlayCircleOutline";
import { StarIcon } from "@/components/ui/icons/star/StarIcon";
import { StarOutline } from "@/components/ui/icons/star-outline/StarOutline";
import { TrashOutline } from "@/components/ui/icons/trash-outline/TrashOutline";
import { Typography } from "@/components/ui/typography";
import {
  AddressClient,
  PhoneClient,
} from "@/services/clients/clientsServicesType";
import clsx from "clsx";

import s from "./TableCellVariant.module.scss";
import { FullAddress } from "@/pages/utils/addresses";

type StarsProps = {
  numberStar?: number;
  value: number;
} & ComponentProps<"div">;
const Stars: FC<StarsProps> = ({
  className,
  numberStar = 5,
  value,
  ...rest
}) => {
  const starsArrNumber: number[] = [];
  const classNames = clsx(className, s.cell);

  for (let i = 0; i < numberStar; i++) {
    starsArrNumber.push(i + 1);
  }

  return (
    <div className={classNames} {...rest}>
      {starsArrNumber.map((n) =>
        n <= value ? (
          <StarIcon className={s.star} color={"#E5AC39"} key={n} width={16} />
        ) : (
          <StarOutline
            className={s.star}
            color={"#E5AC39"}
            key={n}
            width={16}
          />
        )
      )}
    </div>
  );
};

type EditAndTrashProps = {
  onClickEdit?: () => void;
  onClickTrash?: () => void;
  title?: string;
} & ComponentProps<"div">;
const EditAndTrash: FC<EditAndTrashProps> = ({
  className,
  onClickEdit,
  onClickTrash,
  title = "",
  ...rest
}) => {
  const classNames = clsx(className, s.cell);
  const classNamesIcon = clsx(s.icon, s.indentation);

  return (
    <div className={classNames} {...rest}>
      <div className={s.indentation}>
        <Typography variant={"body2"}>{title}</Typography>
      </div>

      <EditOutline className={classNamesIcon} onClick={onClickEdit} />
      <TrashOutline className={s.icon} onClick={onClickTrash} />
    </div>
  );
};

type PlayProps = {
  onChangePlay?: () => void;
} & ComponentProps<"div">;
const Play: FC<PlayProps> = ({ className, onChangePlay, ...rest }) => {
  const classNames = clsx(className, s.cell);
  const classNamesIcon = clsx(s.icon, s.indentation);

  return (
    <div className={classNames} {...rest}>
      <PlayCircleOutline className={classNamesIcon} onClick={onChangePlay} />
    </div>
  );
};

type WithImageProps = {
  src?: null | string;
  title: string;
} & ComponentProps<"div">;
const WithImage: FC<WithImageProps> = ({ className, src, title, ...rest }) => {
  const classNames = clsx(className, s.cell);

  return (
    <div className={classNames} {...rest}>
      {src && <img className={`${s.indentation} ${s.img}`} src={src} />}
      <div className={s.indentation}>
        <Typography variant={"body2"}>{title}</Typography>
      </div>
    </div>
  );
};

type WithSortProps = {
  sort: "down" | "up";
  title: string;
} & ComponentProps<"div">;
const WithSort: FC<WithSortProps> = ({
  className,
  sort = "down",
  title,
  ...rest
}) => {
  const classNames = clsx(className, s.cell, s.attached);

  return (
    <div className={classNames} {...rest}>
      <div className={s.sort}>
        <Typography variant={"body2"}>{title}</Typography>
      </div>
      {sort === "down" ? <ArrowDown /> : <ArrowUp />}
    </div>
  );
};

type PhonesProps = {
  data: PhoneClient[];
} & ComponentProps<"div">;
const Phones = ({ className, data, ...rest }: PhonesProps) => {
  const classNames = clsx(className, s.cell);

  if (data.length) {
    return (
      <div className={classNames} {...rest}>
        <div className={s.tel}>{data[0].tel}</div>
        <div>
          {data
            .filter((_, i) => {
              return i !== 0;
            })
            .map((phone, i) => (
              <PhoneWithModal
                key={i}
                name={phone.nameUserPhone}
                tel={phone.tel}
              />
            ))}
        </div>
      </div>
    );
  }

  return <div>Нет телефонов</div>;
};

type PhoneWithModalType = {
  name: string;
  tel: string;
};
const PhoneWithModal = ({ name, tel }: PhoneWithModalType) => {
  return (
    <div className={s.phoneWithModal}>
      <PhoneIcon className={s.icon} />
      <div className={s.modalPhone}>
        <div>{name}</div>
        <div>{tel}</div>
      </div>
    </div>
  );
};

type AddressesProps = {
  data: AddressClient[];
} & ComponentProps<"div">;
const Addresses = ({ className, data, ...rest }: AddressesProps) => {
  const classNames = clsx(className, s.cell);

  if (data.length) {
    const firstAddresses = data[0];

    return (
      <div className={classNames} {...rest}>
        <FullAddress address={firstAddresses} />
      </div>
    );
  }

  return <div>Нет данных</div>;
};

type EditProps = {
  onClickEdit?: () => void;
  title?: string;
} & ComponentProps<"div">;
const Edit: FC<EditProps> = ({
                               className,
                               onClickEdit,
                               title = "",
                               ...rest
                             }) => {
  const classNames = clsx(className, s.cell);
  const classNamesIcon = clsx(s.icon, s.indentation);

  return (
    <div className={classNames} {...rest}>
      <div className={s.indentation}>
        <Typography variant={"body2"}>{title}</Typography>
      </div>

      <EditOutline className={classNamesIcon} onClick={onClickEdit}/>
    </div>
  );
};

export const CellVariant = {
  Addresses,
  EditAndTrash,
  Phones,
  Play,
  Stars,
  WithImage,
  WithSort,
  Edit,
};
