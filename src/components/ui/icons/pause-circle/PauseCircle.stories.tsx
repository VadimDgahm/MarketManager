import type { Meta, StoryObj } from "@storybook/react";

import { PauseCircle } from "./PauseCircle";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: PauseCircle,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof PauseCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PauseCircle2: Story = {
  args: {
    color: "",
    onClick: () => alert("ку"),
  },
};
