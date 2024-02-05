import type { Meta, StoryObj } from "@storybook/react";

import { EyeOffOutline } from "./EyeOffOutline";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: EyeOffOutline,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof EyeOffOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EyeOff1: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
