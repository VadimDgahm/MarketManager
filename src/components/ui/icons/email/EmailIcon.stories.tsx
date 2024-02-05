import type { Meta, StoryObj } from "@storybook/react";

import { EmailIcon } from "./EmailIcon";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: EmailIcon,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof EmailIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email2: Story = {
  args: {
    color: "",
    onClick: () => alert("ку"),
  },
};
