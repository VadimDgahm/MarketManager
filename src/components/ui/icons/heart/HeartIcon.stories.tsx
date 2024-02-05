import type { Meta, StoryObj } from "@storybook/react";

import { HeartIcon } from "./HeartIcon";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: HeartIcon,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof HeartIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heart2: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
