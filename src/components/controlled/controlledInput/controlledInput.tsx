import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { Input, InputProps } from "@/components/ui/Input";

export type ControlledInputProps<T extends FieldValues> =
  UseControllerProps<T> & InputProps;

export const ControlledInput = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  label,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledInputProps<T>) => {
  const {
    field: { onChange, ref, value },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  });

  return (
    <Input
      {...rest}
      defaultValue={defaultValue}
      errorMessage={error?.message}
      label={label}
      name={name}
      onChange={onChange}
      ref={ref}
      value={value}
    />
  );
};
