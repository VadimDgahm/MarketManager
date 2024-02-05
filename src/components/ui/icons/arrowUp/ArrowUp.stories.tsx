import type { Meta, StoryObj } from "@storybook/react";

import { ArrowUp } from "./ArrowUp";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: ArrowUp,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof ArrowUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArrowUpIcon: Story = {
  args: {
    color: "",
    onClick: () => alert("ку"),
  },
};
