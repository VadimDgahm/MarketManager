import type { Meta, StoryObj } from "@storybook/react";

import { Expand } from "./Expand";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: Expand,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof Expand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExpandIcon: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
