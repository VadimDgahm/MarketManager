import { FC } from "react";

import { determineVersion } from "@/components/ui/icons/settingsIcons";
import { IconProps } from "@/components/ui/icons/typeIcons";

import s from "../Icons.module.scss";

export const PaperPlane: FC<IconProps> = ({
  color = "",
  version = "dark",
  ...rest
}) => {
  return (
    <svg
      {...rest}
      className={`${s.svg} ${rest.className} `}
      fill={"none"}
      height={"24"}
      viewBox={"0 0 24 24"}
      width={"24"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path
        d={
          "M21 4.00001C20.9896 3.90814 20.9695 3.81764 20.94 3.73001V3.64001C20.8921 3.52872 20.8243 3.42706 20.74 3.34001C20.6551 3.26027 20.557 3.19597 20.45 3.15001H20.36C20.2678 3.07962 20.1624 3.02859 20.05 3.00001H20C19.9006 2.98492 19.7994 2.98492 19.7 3.00001L1.7 9.00001C1.49993 9.06577 1.32573 9.19301 1.20223 9.3636C1.07874 9.53419 1.01225 9.73941 1.01225 9.95001C1.01225 10.1606 1.07874 10.3658 1.20223 10.5364C1.32573 10.707 1.49993 10.8342 1.7 10.9L10.23 13.74L13.07 22.27C13.1358 22.4701 13.263 22.6443 13.4336 22.7678C13.6042 22.8913 13.8094 22.9578 14.02 22.9578C14.2306 22.9578 14.4358 22.8913 14.6064 22.7678C14.777 22.6443 14.9042 22.4701 14.97 22.27L20.97 4.27001C20.9922 4.18179 21.0023 4.09095 21 4.00001ZM16.3 6.29001L10.73 11.86L5.16 10L16.3 6.29001ZM14 18.84L12.14 13.27L17.71 7.70001L14 18.84Z"
        }
        fill={color ? color : determineVersion(version)}
      />
    </svg>
  );
};
