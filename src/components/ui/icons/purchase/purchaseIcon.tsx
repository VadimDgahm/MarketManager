import { FC } from "react";

import { determineVersion } from "@/components/ui/icons/settingsIcons";
import { IconProps } from "@/components/ui/icons/typeIcons";

import s from "../Icons.module.scss";

export const PurchaseIcon: FC<IconProps> = ({
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
      height={18}
      viewBox={"0 0 18 18"}
      width={width}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <g clipPath={"url(#clip0_1222_47907)"}>
        <path
          d={"M7 0.5V4.5"}
          stroke={"red"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={
            "M0.5 4.5H13.5V12.5C13.5 12.7652 13.3946 13.0196 13.2071 13.2071C13.0196 13.3946 12.7652 13.5 12.5 13.5H1.5C1.23478 13.5 0.98043 13.3946 0.792893 13.2071C0.605357 13.0196 0.5 12.7652 0.5 12.5V4.5Z"
          }
          stroke={"white"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={
            "M0.5 4.5L2 1.61C2.16171 1.28427 2.40917 1.0088 2.71576 0.813215C3.02235 0.617632 3.37646 0.509344 3.74 0.5H10.26C10.6321 0.500197 10.9967 0.604188 11.313 0.800279C11.6292 0.996371 11.8844 1.27679 12.05 1.61L13.5 4.5"
          }
          stroke={"white"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={"M9.49807 7L6.50171 11L4.50171 9.50182"}
          stroke={"white"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath id={"clip0_1222_47907"}>
          <rect
            fill={color ? color : determineVersion(version)}
            height={"14"}
            width={"14"}
          />
        </clipPath>
      </defs>
    </svg>
  );
};
