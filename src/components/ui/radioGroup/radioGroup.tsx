import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { Typography, TypographyProps } from "@/components/ui/typography";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";

import s from "./radioGroup.module.scss";

export type RadioValues = {
  grade: number;
  value: string;
};

export type RadioGroupProps = {
  errorMessage?: string;
  errorMessageProps?: TypographyProps<"span">;
  /**The name used when using this component inside a form*/
  name?: string;
  onChange?: (value: string) => void;
  options: RadioValues[];
} & Omit<ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>, "orientation">;

export const RadioGroup = forwardRef<
  ElementRef<typeof RadixRadioGroup.Root>,
  RadioGroupProps
>(
  (
    {
      defaultValue,
      disabled,
      errorMessage,
      errorMessageProps,
      onValueChange,
      options,
      value,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={s.wrapper}>
        <RadixRadioGroup.Root
          className={`${disabled ? ` ${s.DisabledRadioGroup}` : ""}`}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          ref={ref}
          {...rest}
        >
          {options.map((option, index) => {
            return (
              <span className={s.radioString} key={index}>
                <RadixRadioGroup.Item
                  className={s.RadioGroupItem}
                  key={index}
                  value={option.value}
                >
                  <RadixRadioGroup.Indicator
                    className={disabled ? "" : s.RadioGroupIndicator}
                    key={index}
                  />
                </RadixRadioGroup.Item>
                <label className={s.RadioLabel}>
                  <Typography>{option.value}</Typography>
                </label>
              </span>
            );
          })}
          {errorMessage && (
            <Typography {...errorMessageProps} className={s.error}>
              {errorMessage}
            </Typography>
          )}
        </RadixRadioGroup.Root>
      </div>
    );
  },
);
