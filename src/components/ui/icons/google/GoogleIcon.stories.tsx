import type { Meta, StoryObj } from "@storybook/react";

import { GoogleIcon } from "./GoogleIcon";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: GoogleIcon,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof GoogleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Google: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
