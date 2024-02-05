import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { Checkbox, CheckboxProps } from "@/components/ui/checkbox";

export type ControlledCheckboxProps<T extends FieldValues> =
  UseControllerProps<T> & Omit<CheckboxProps, "checked" | "onValueChange">;

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, ref, value },
    // fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  });

  return (
    <Checkbox
      {...rest}
      checked={value}
      disabled={disabled}
      onValueChange={onChange}
      ref={ref}
    />
  );
};
