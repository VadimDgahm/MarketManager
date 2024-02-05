import type { Meta, StoryObj } from "@storybook/react";

import { PlusCircleOutline } from "./PlusCircleOutline";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: PlusCircleOutline,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof PlusCircleOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlusCircle1: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
