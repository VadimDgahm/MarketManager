import { FC } from "react";

import { determineVersion } from "@/components/ui/icons/settingsIcons";
import { IconProps } from "@/components/ui/icons/typeIcons";

export const SmailNew: FC<IconProps> = ({
  color = "",
  height = 18,
  version = "dark",
  width = 18,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      fill={"none"}
      height={"28"}
      viewBox={"0 0 24 24"}
      width={"28"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <g clipPath={"url(#clip0_1222_45034)"}>
        <path
          d={
            "M7 13.5C10.5899 13.5 13.5 10.5899 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5Z"
          }
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={"M4.75 3.5V6"}
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={"M3.5 4.75H6"}
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={"M9.25 3.5V6"}
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={"M8 4.75H10.5"}
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={
            "M3.5354 8C3.77802 9.69615 5.23672 11 6.99996 11C8.76319 11 10.2219 9.69615 10.4645 8H3.5354Z"
          }
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath id={"clip0_1222_45034"}>
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
export const SmailTrue: FC<IconProps> = ({
  color = "",
  height = 22,
  version = "dark",
  width = 22,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      fill={"none"}
      height={"28"}
      viewBox={"0 0 24 24"}
      width={"28"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <g clipPath={"url(#clip0_1222_44879)"}>
        <path
          d={
            "M7.23218 10.6169C7.58093 10.6646 8.11149 10.4603 8.53159 10.1389C8.75615 9.96705 8.95666 9.75601 9.10155 9.54346"
          }
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={
            "M13.3655 5.67822C13.4537 6.10501 13.5 6.5471 13.5 7C13.5 10.5899 10.5899 13.5 7 13.5C3.41015 13.5 0.5 10.5899 0.5 7C0.5 6.5471 0.546321 6.10501 0.634483 5.67822"
          }
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={
            "M12.7678 4C11.6837 1.92011 9.50769 0.5 6.99997 0.5C4.49224 0.5 2.3162 1.92011 1.23218 4"
          }
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={
            "M0.5 4.75V4H7V4.75C7 6.54493 5.54493 8 3.75 8C1.95507 8 0.5 6.54493 0.5 4.75Z"
          }
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={
            "M7 4.75V4H13.5V4.75C13.5 6.54493 12.0449 8 10.25 8C8.45507 8 7 6.54493 7 4.75Z"
          }
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath id={"clip0_1222_44879"}>
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

export const SmailFalse: FC<IconProps> = ({
  color = "",
  height = 18,
  version = "dark",
  width = 18,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      fill={"none"}
      height={"28"}
      viewBox={"0 0 24 24"}
      width={"28"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <g clipPath={"url(#clip0_1222_44916)"}>
        <path
          d={
            "M7 13.5C10.5899 13.5 13.5 10.5899 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5Z"
          }
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={
            "M4 9.5C4.44776 8.07192 6.14925 7.19921 7.85075 7.59589C8.83582 7.83391 9.64179 8.54795 10 9.5"
          }
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={"M4 4.5H5.5V5"}
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={"M8.5 4.5H10V5"}
          stroke={color ? color : determineVersion(version)}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath id={"clip0_1222_44916"}>
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
