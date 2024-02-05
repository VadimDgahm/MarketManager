import { ElementRef, forwardRef, useId } from "react";

import * as CheckboxRadix from "@radix-ui/react-checkbox";

import s from "./checkbox.module.scss";

import Check from "./check";

export type CheckboxProps = {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  label?: string;
  // onChange?: (checked: boolean) => void
  onValueChange?: (checked: boolean) => void;
};

export const Checkbox = forwardRef<
  ElementRef<typeof CheckboxRadix.Root>,
  CheckboxProps
>(
  (
    {
      checked,
      className,
      disabled = false,
      label,
      onValueChange,
      // onChange,
      ...rest
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className={`${s.container} ${className || ""}`}>
        <div className={`${s.buttonContainer} ${disabled && s.disabled}`}>
          <CheckboxRadix.Root
            checked={checked}
            className={`${s.button} ${checked ? s.checked : s.unchecked} `}
            disabled={disabled}
            id={id}
            onCheckedChange={onValueChange}
            ref={ref}
            {...rest}
          >
            <CheckboxRadix.Indicator className={s.indicator}>
              <Check
                color={`${disabled ? "var(--color-dark-100)" : "white"}`}
              />
            </CheckboxRadix.Indicator>
          </CheckboxRadix.Root>
          <div className={s.back} />
        </div>
        <label className={`${disabled && s.disabled}`} htmlFor={id}>
          {label}
        </label>
      </div>
    );
  },
);

/* замена в checkbox onChange на onValueChange*/
