import { FC } from "react";

import { determineVersion } from "@/components/ui/icons/settingsIcons";
import { IconProps } from "@/components/ui/icons/typeIcons";

import s from "../Icons.module.scss";

export const Pig: FC<IconProps> = ({
  color = "",
  height = 18,
  version = "dark",
  width = 18,
  ...rest
}) => {
  return <div>Свинина</div>;
};
