import { FC } from "react";

import { determineVersion } from "@/components/ui/icons/settingsIcons";
import { IconProps } from "@/components/ui/icons/typeIcons";

import s from "../Icons.module.scss";

export const LayersOutline: FC<IconProps> = ({
  color = "",
  version = "dark",
  ...rest
}) => {
  return (
    <svg
      {...rest}
      className={`${s.svg} ${rest.className} `}
      fill={"none"}
      height={"18"}
      viewBox={"0 0 24 24"}
      width={"18"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path
        d={
          "M21 11.35C20.9885 11.1641 20.9253 10.985 20.8176 10.8331C20.7098 10.6811 20.5617 10.5623 20.39 10.49L18.24 9.57L20.5 8.27C20.6602 8.17784 20.7918 8.04308 20.88 7.88067C20.9683 7.71827 21.0098 7.53458 21 7.35C20.9885 7.16406 20.9253 6.98503 20.8176 6.83308C20.7098 6.68112 20.5617 6.5623 20.39 6.49L12.39 3.08C12.2666 3.02774 12.134 3.00082 12 3.00082C11.866 3.00082 11.7334 3.02774 11.61 3.08L3.61 6.49C3.43831 6.5623 3.29023 6.68112 3.18245 6.83308C3.07467 6.98503 3.01148 7.16406 3 7.35C2.99017 7.53458 3.0317 7.71827 3.11996 7.88067C3.20822 8.04308 3.33977 8.17784 3.5 8.27L5.76 9.57L3.61 10.49C3.43831 10.5623 3.29023 10.6811 3.18245 10.8331C3.07467 10.985 3.01148 11.1641 3 11.35C2.99017 11.5346 3.0317 11.7183 3.11996 11.8807C3.20822 12.0431 3.33977 12.1778 3.5 12.27L5.76 13.57L3.61 14.49C3.43831 14.5623 3.29023 14.6811 3.18245 14.8331C3.07467 14.985 3.01148 15.1641 3 15.35C2.99017 15.5346 3.0317 15.7183 3.11996 15.8807C3.20822 16.0431 3.33977 16.1778 3.5 16.27L11.5 20.87C11.652 20.9578 11.8245 21.004 12 21.004C12.1755 21.004 12.348 20.9578 12.5 20.87L20.5 16.27C20.6602 16.1778 20.7918 16.0431 20.88 15.8807C20.9683 15.7183 21.0098 15.5346 21 15.35C20.9885 15.1641 20.9253 14.985 20.8176 14.8331C20.7098 14.6811 20.5617 14.5623 20.39 14.49L18.24 13.57L20.5 12.27C20.6602 12.1778 20.7918 12.0431 20.88 11.8807C20.9683 11.7183 21.0098 11.5346 21 11.35ZM12 5.09L17.76 7.54L12 10.85L6.24 7.54L12 5.09ZM11.5 12.87C11.652 12.9578 11.8245 13.004 12 13.004C12.1755 13.004 12.348 12.9578 12.5 12.87L16.07 10.87L17.76 11.59L12 14.85L6.24 11.54L7.93 10.82L11.5 12.87ZM17.76 15.54L12 18.85L6.24 15.54L7.93 14.82L11.5 16.87C11.652 16.9578 11.8245 17.004 12 17.004C12.1755 17.004 12.348 16.9578 12.5 16.87L16.07 14.82L17.76 15.54Z"
        }
        fill={color ? color : determineVersion(version)}
      />
    </svg>
  );
};
