import type { Meta, StoryObj } from "@storybook/react";

import { PinIcon } from "./PinIcon";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: PinIcon,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof PinIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pin2: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
