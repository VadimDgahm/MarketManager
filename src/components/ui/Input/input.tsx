import { ChangeEvent, ComponentPropsWithoutRef, forwardRef } from "react";

import { useInput } from "@/components/ui/Input/hook/hookInput";
import { EyeOffOutline } from "@/components/ui/icons/eye-off-outline/EyeOffOutline";
import { EyeOutline } from "@/components/ui/icons/eye-outline/EyeOutline";
import { SearchIcon } from "@/components/ui/icons/search/SearchIcon";
import { Typography } from "@/components/ui/typography";
import clsx from "clsx";

import s from "./input.module.scss";

export type InputProps = {
  errorMessage?: string;
  label?: string;
  onValueChange?: (value: string) => void;
} & ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, errorMessage, label, onChange, onValueChange, ...rest },
    ref,
  ) => {
    const { isOpenEye, onClickSvgEye, typeInput } = useInput(rest.type);
    const classNames = clsx(
      s.input,
      errorMessage && s.error,
      typeInput === "search" && s.search,
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <div className={`${s.box} ${className}`}>
        <div className={s.inputBox}>
          <div className={s.inputContainer}>
            <label>{label}</label>
            <input
              className={classNames}
              onChange={handleChange}
              // ref={rootInput}
              ref={ref}
              {...rest}
              type={typeInput}
            />

            {typeInput === "search" && (
              <SearchIcon className={s.searchIcon} width={20} />
            )}
            {isOpenEye !== undefined && (
              <EyeIcon isOpenEye={isOpenEye} onClickSvgEye={onClickSvgEye} />
            )}
            {errorMessage && (
              <Typography className={s.errorMessage} variant={"caption"}>
                {errorMessage}
              </Typography>
            )}
          </div>
        </div>
      </div>
    );
  },
);

type EyeIconProps = {
  isOpenEye: boolean | undefined;
  onClickSvgEye: (isOpen: boolean) => void;
};
const EyeIcon = ({ isOpenEye, onClickSvgEye }: EyeIconProps) => {
  return (
    <button
      className={s.buttonEye}
      onClick={() => onClickSvgEye(!isOpenEye)}
      type={"button"}
    >
      {!isOpenEye ? <EyeOutline /> : <EyeOffOutline />}
    </button>
  );
};
