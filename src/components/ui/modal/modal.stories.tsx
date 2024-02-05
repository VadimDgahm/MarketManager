import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import Modal, { ModalProps } from "@/components/ui/modal/modal";
import ModalWithButton from "@/components/ui/modal/modalWithButton/modalWithButton";
import ModalWithContent from "@/components/ui/modal/modalWithContent/modalWithContent";

const meta = {
  argTypes: {},
  component: Modal,
  tags: ["autodocs"],
  title: "Components/Modal",
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalDefault: Story = {
  render: (args: ModalProps) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          as={"button"}
          onClick={() => setOpen(true)}
          style={{ width: "100px" }}
          variant={"primary"}
        >
          Open Modal
        </Button>
        <Modal title={"dcdcdcd"} {...args} open={open} setOpen={setOpen}>
          <>
            <ModalWithContent>
              Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do
              eiusmod temper ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est labor.
            </ModalWithContent>
            <ModalWithButton titleButton={"New card"} />
          </>
        </Modal>
      </>
    );
  },
};
