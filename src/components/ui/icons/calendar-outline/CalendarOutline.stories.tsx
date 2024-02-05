import type { Meta, StoryObj } from "@storybook/react";

import { CalendarOutline } from "./CalendarOutline";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: CalendarOutline,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof CalendarOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Calendar1: Story = {
  args: {
    color: "",
    onClick: () => alert("ку"),
  },
};
