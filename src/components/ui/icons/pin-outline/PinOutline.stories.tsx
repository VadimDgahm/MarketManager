import type { Meta, StoryObj } from "@storybook/react";

import { PinOutline } from "./PinOutline";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: PinOutline,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof PinOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pin1: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
