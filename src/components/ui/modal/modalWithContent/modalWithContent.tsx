import { FC, ReactNode } from "react";

import s from "./modalWithContent.module.scss";

type ModalWithContentProps = {
  children?: ReactNode;
  className?: string;
};
const ModalWithContent: FC<ModalWithContentProps> = ({
  children,
  className,
}) => {
  return <div className={`${s.content} ${className}`}>{children}</div>;
};

export default ModalWithContent;
