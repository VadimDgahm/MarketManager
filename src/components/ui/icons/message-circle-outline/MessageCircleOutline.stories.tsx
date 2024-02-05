import type { Meta, StoryObj } from "@storybook/react";

import { MessageCircleOutline } from "./MessageCircleOutline";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: MessageCircleOutline,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof MessageCircleOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageCircle1: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
