import type { Meta, StoryObj } from "@storybook/react";

import { PaperPlane } from "./PaperPlane";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: PaperPlane,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof PaperPlane>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaperPlaneIcon: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
