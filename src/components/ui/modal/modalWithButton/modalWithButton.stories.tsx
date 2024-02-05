import type { Meta, StoryObj } from "@storybook/react";

import ModalWithButton from "./modalWithButton";

const meta = {
  component: ModalWithButton,
  tags: ["autodocs"],
  title: "Components/Modal",
} satisfies Meta<typeof ModalWithButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalWithButtonDefault: Story = {
  args: {
    isSecondary: true,
    titleButton: "Button Primary",
  },
};
