import type { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "./Calendar";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: Calendar,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Calendar2: Story = {
  args: {
    color: "",
    onClick: () => alert("ку"),
  },
};
