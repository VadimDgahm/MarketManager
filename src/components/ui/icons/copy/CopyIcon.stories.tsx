import type { Meta, StoryObj } from "@storybook/react";

import { CopyIcon } from "./CopyIcon";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: CopyIcon,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof CopyIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Copy2: Story = {
  args: {
    color: "",
    onClick: () => alert("ку"),
  },
};
