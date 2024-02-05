import type { Meta, StoryObj } from "@storybook/react";

import { PlusSquareOutline } from "./PlusSquareOutline";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: PlusSquareOutline,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof PlusSquareOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlusSquare1: Story = {
  args: {
    color: "",
    onClick: () => alert("ку"),
  },
};
