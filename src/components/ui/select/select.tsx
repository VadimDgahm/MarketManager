import { ElementRef, forwardRef } from "react";

import { ArrowDown } from "@/components/ui/icons/arrowDown/ArrowDown";
import { Typography } from "@/components/ui/typography";
import * as SelectRadix from "@radix-ui/react-select";

import "@radix-ui/themes/styles.css";

import s from "./select.module.scss";

export type SelectorPropsType = {
  className?: string;
  options: (number | string)[] | { id: string; value: string }[];
  title?: string;
  variant?: "default" | "pagination";
} & SelectRadix.SelectProps;
export const Select = forwardRef<
  ElementRef<typeof SelectRadix.Root>,
  SelectorPropsType
>(({ className, options, title, variant = "default", ...rest }, ref) => {
  const optionsItem = options.map((op, i) => (
    <SelectRadix.Item
      className={s.SelectItem}
      key={i}
      value={op.id ? op.id : op.toString()}
    >
      <SelectRadix.ItemText>
        {op.value ? op.value : op.toString()}
      </SelectRadix.ItemText>
    </SelectRadix.Item>
  ));

  return (
    <div>
      {title && (
        <Typography className={s.title} variant={"body2"}>
          {title}
        </Typography>
      )}
      <SelectRadix.Root {...rest}>
        <div className={`${s.back} `}>
          <SelectRadix.Trigger
            className={`${s.SelectTrigger}  ${
              variant === "pagination" && s.pagination
            } ${className}`}
            ref={ref}
          >
            <SelectRadix.Value
              placeholder={variant === "pagination" ? options[0] : ""}
            />
            <SelectRadix.Icon>
              <ArrowDown className={s.icon} color={"white"} width={16} />
            </SelectRadix.Icon>
          </SelectRadix.Trigger>
          <SelectRadix.Portal>
            <SelectRadix.Content
              className={s.SelectContent}
              position={"popper"}
            >
              <SelectRadix.Group className={s.optionsContainer}>
                {optionsItem}
              </SelectRadix.Group>
            </SelectRadix.Content>
          </SelectRadix.Portal>
        </div>
      </SelectRadix.Root>
    </div>
  );
});
