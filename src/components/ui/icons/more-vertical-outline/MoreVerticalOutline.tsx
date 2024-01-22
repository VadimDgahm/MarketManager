import { FC } from 'react'

import { determineVersion } from '@/components/ui/icons/settingsIcons'
import { IconProps } from '@/components/ui/icons/typeIcons'

import s from '../Icons.module.scss'

export const MoreVerticalOutline: FC<IconProps> = ({ color = '', version = 'dark', ...rest }) => {
  return (
    <svg
      {...rest}
      className={`${s.svg} ${rest.className} `}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C10.0222 2 8.08879 2.58649 6.44429 3.6853C4.7998 4.78412 3.51808 6.3459 2.7612 8.17317C2.00433 10.0004 1.80629 12.0111 2.19214 13.9509C2.578 15.8907 3.5304 17.6725 4.92893 19.0711C6.32745 20.4696 8.10928 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9996 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4177 20 8.87103 19.5308 7.55543 18.6518C6.23984 17.7727 5.21446 16.5233 4.60896 15.0615C4.00346 13.5997 3.84503 11.9911 4.15371 10.4393C4.4624 8.88743 5.22432 7.46197 6.34314 6.34315C7.46196 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
        fill={color ? color : determineVersion(version)}
      />
      <svg
        width="13"
        height="20"
        viewBox="-5 -2 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_5928_6372)">
          <path
            d="M6 7C6.55228 7 7 6.55228 7 6C7 5.44772 6.55228 5 6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7Z"
            fill={color ? color : determineVersion(version)}
          />
          <path
            d="M6 3.5C6.55228 3.5 7 3.05228 7 2.5C7 1.94772 6.55228 1.5 6 1.5C5.44772 1.5 5 1.94772 5 2.5C5 3.05228 5.44772 3.5 6 3.5Z"
            fill={color ? color : determineVersion(version)}
          />
          <path
            d="M6 10.5C6.55228 10.5 7 10.0523 7 9.5C7 8.94772 6.55228 8.5 6 8.5C5.44772 8.5 5 8.94772 5 9.5C5 10.0523 5.44772 10.5 6 10.5Z"
            fill={color ? color : determineVersion(version)}
          />
        </g>
        <defs>
          <clipPath id="clip0_5928_6372">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </svg>
  )
}
