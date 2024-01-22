import {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
  useState,
} from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import s from "@/components/ui/dropDownMenu/DropDownMenu.module.css";

export type DropDownProps = {
  children?: ReactNode;
  trigger?: ReactNode;
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>;
export const DropDownMenu = forwardRef<ElementRef<"div">, DropDownProps>(
  ({ children, trigger }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <DropdownMenu.Root onOpenChange={setOpen} open={open}>
        <DropdownMenu.Trigger asChild>
          <button className={s.trigger}>{trigger}</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align={"end"}
            className={s.DropdownMenuContent}
            ref={ref}
            sideOffset={5}
          >
            {children}
            <DropdownMenu.Arrow
              asChild
              className={s.DropdownMenuArrow}
              height={15}
              width={15}
            >
              <div className={s.triangle}></div>
            </DropdownMenu.Arrow>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  },
);
