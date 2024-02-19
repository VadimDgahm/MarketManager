import { ElementRef, forwardRef } from "react";

import { Typography } from "@/components/ui/typography";
import * as TabSwitcherRadix from "@radix-ui/react-toggle-group";

import s from "./tabSwitcher.module.scss";

type TabSwitcherProps<T> = {
  disable?: boolean;
  onValueChange: (value: string) => void;
  value: string;
  valuesCollection: ValuesPosition<T>[];
};

export type ValuesPosition<T = string> = {
  location: T;
  value: T;
};
export const TabSwitcher = forwardRef<
  ElementRef<typeof TabSwitcherRadix.Root>,
  TabSwitcherProps<string>
>(({ disable, onValueChange, value, valuesCollection }, _ref) => {
  return (
    <TabSwitcherRadix.Root
      className={s.toggleGroup}
      onValueChange={(value) => {
        if (value) {
          onValueChange(value);
        }
      }}
      type={"single"}
      value={value}
    >
      {valuesCollection.map((elem, index) => {
        return (
          <TabSwitcherRadix.Item
            className={s.toggleGroupItem}
            disabled={disable}
            key={index}
            value={elem.location}
          >
            <Typography variant={"body1"}>{elem.value}</Typography>
          </TabSwitcherRadix.Item>
        );
      })}
    </TabSwitcherRadix.Root>
  );
});
