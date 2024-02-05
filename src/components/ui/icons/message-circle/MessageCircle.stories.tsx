import type { Meta, StoryObj } from "@storybook/react";

import { MessageCircle } from "./MessageCircle";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: MessageCircle,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof MessageCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageCircle2: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
