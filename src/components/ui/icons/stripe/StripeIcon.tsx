import { FC } from 'react'
import { IconProps } from '@/components/ui/icons/typeIcons'

export const StripeIcon: FC<IconProps> = ({ color = '', version = 'dark', ...rest }) => {
  return (
    <svg
      {...rest}
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.7266 5.35444L11.5074 5.61611V4.62765L12.7266 4.37085V5.35444ZM15.262 5.90198C14.7859 5.90198 14.4799 6.12484 14.31 6.27991L14.2468 5.9795H13.1782V11.6291L14.3925 11.3723L14.3974 10.0011C14.5722 10.127 14.8297 10.3063 15.2571 10.3063C16.1265 10.3063 16.9182 9.60861 16.9182 8.07264C16.9134 6.66751 16.1119 5.90198 15.262 5.90198ZM14.9705 9.24035C14.6839 9.24035 14.5139 9.13862 14.3973 9.01262L14.3925 7.21502C14.5188 7.07452 14.6936 6.97763 14.9705 6.97763C15.4125 6.97763 15.7185 7.47182 15.7185 8.10655C15.7185 8.75582 15.4173 9.24035 14.9705 9.24035ZM20.7457 8.12109C20.7457 6.8807 20.1434 5.90198 18.9923 5.90198C17.8363 5.90198 17.1369 6.8807 17.1369 8.11142C17.1369 9.56983 17.9626 10.3063 19.1477 10.3063C19.7257 10.3063 20.1629 10.1755 20.4931 9.99138V9.02232C20.1629 9.18707 19.784 9.28883 19.3032 9.28883C18.832 9.28883 18.4143 9.12408 18.3609 8.55234H20.736C20.736 8.52566 20.7378 8.46508 20.7398 8.39524C20.7425 8.30027 20.7457 8.18808 20.7457 8.12109ZM18.3463 7.6608C18.3463 7.1133 18.6814 6.88557 18.9874 6.88557C19.2837 6.88557 19.5994 7.1133 19.5994 7.6608H18.3463ZM11.5074 5.98434H12.7265V10.224H11.5074V5.98434ZM10.1232 5.98434L10.2009 6.3429C10.4875 5.81959 11.0558 5.92619 11.2112 5.98434V7.09876C11.0606 7.04544 10.5749 6.97763 10.2883 7.35072V10.224H9.07404V5.98434H10.1232ZM7.77225 4.9329L6.5871 5.18486L6.58226 9.06594C6.58226 9.78302 7.1214 10.3112 7.84024 10.3112C8.23854 10.3112 8.52996 10.2385 8.69025 10.1513V9.1677C8.53483 9.23068 7.76738 9.45357 7.76738 8.73645V7.01637H8.69025V5.98434H7.76738L7.77225 4.9329ZM4.90175 6.95342C4.6443 6.95342 4.48888 7.02607 4.48888 7.21506C4.48888 7.42139 4.75638 7.51214 5.08823 7.62474C5.62922 7.8083 6.3413 8.04988 6.34432 8.9448C6.34432 9.81213 5.64972 10.3112 4.63946 10.3112C4.22172 10.3112 3.76514 10.2288 3.31343 10.035V8.88182C3.72143 9.10471 4.2363 9.26946 4.63946 9.26946C4.91145 9.26946 5.10575 9.19677 5.10575 8.97388C5.10575 8.74536 4.81576 8.6409 4.4657 8.51479C3.93256 8.32272 3.26001 8.08043 3.26001 7.2732C3.26001 6.41558 3.91572 5.90198 4.90175 5.90198C5.30488 5.90198 5.70318 5.96496 6.10631 6.12487V7.2635C5.73715 7.06485 5.27087 6.95342 4.90175 6.95342Z"
        fill="#6461FC"
      />
      <defs>
        <clipPath id="clip0_5661_2015">
          <rect width="24" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
