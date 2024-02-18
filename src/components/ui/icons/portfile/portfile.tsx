import { FC } from "react";

import { determineVersion } from "@/components/ui/icons/settingsIcons";
import { IconProps } from "@/components/ui/icons/typeIcons";

import s from "../Icons.module.scss";

export const Portfile: FC<IconProps> = ({
  color = "",
  version = "dark",
  width = 18,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      className={`${s.svg} ${rest.className} `}
      fill={"none"}
      height={width}
      viewBox={"0 0 24 24"}
      width={width}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path
        d={
          "M12 21V13M12 21L4.94 16.5875C4.48048 16.3003 4.25072 16.1567 4.12536 15.9305C4 15.7043 4 15.4334 4 14.8915V8M12 21L16 18.5L19.06 16.5875C19.5195 16.3003 19.7493 16.1567 19.8746 15.9305C20 15.7043 20 15.4334 20 14.8915V8M12 13L4 8M12 13L20 8M4 8L10.94 3.6625C11.4555 3.34033 11.7132 3.17925 12 3.17925C12.2868 3.17925 12.5445 3.34033 13.06 3.6625L20 8"
        }
        stroke={color ? color : determineVersion(version)}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
      />
      <path
        d={
          "M15 14.5C15 15.0523 15.4477 15.5 16 15.5C16.5523 15.5 17 15.0523 17 14.5H15ZM15.8746 10.5695L16.7493 10.0847L15.8746 10.5695ZM7.47 6.348L14.53 10.7605L15.59 9.0645L8.53 4.652L7.47 6.348ZM17 14.5V11.6085H15V14.5H17ZM14.53 10.7605C14.7757 10.9141 14.9004 10.9932 14.9843 11.0575C15.0512 11.1089 15.027 11.1029 15 11.0542L16.7493 10.0847C16.5969 9.80984 16.3951 9.61902 16.201 9.47022C16.0238 9.33438 15.8038 9.19813 15.59 9.0645L14.53 10.7605ZM17 11.6085C17 11.3564 17.0011 11.0976 16.9798 10.8753C16.9565 10.6319 16.9016 10.3596 16.7493 10.0847L15 11.0542C14.973 11.0056 14.9808 10.9818 14.9889 11.0659C14.9989 11.1711 15 11.3187 15 11.6085H17Z"
        }
        fill={color ? color : determineVersion(version)}
      />
    </svg>
  );
};
