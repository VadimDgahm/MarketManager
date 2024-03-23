import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { RadioGroup, RadioGroupProps } from "@/components/ui/radioGroup";

export type CustomRadioGroupProps<T extends FieldValues> =
  UseControllerProps<T> & RadioGroupProps;

export const ControlledRadio = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  errorMessage,
  name,
  options,
  rules,
  shouldUnregister,
  ...rest
}: CustomRadioGroupProps<T>) => {
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
    <RadioGroup
      {...rest}
      defaultValue={defaultValue}
      disabled={disabled}
      errorMessage={error?.message ? "Please, choose a grade" : ""}
      name={name}
      onValueChange={onChange}
      options={options}
      ref={ref}
      value={value}
    />
  );
};
