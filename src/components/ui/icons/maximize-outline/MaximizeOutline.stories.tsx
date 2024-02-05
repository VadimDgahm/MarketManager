import type { Meta, StoryObj } from "@storybook/react";

import { MaximizeOutline } from "./MaximizeOutline";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: MaximizeOutline,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof MaximizeOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Maximize1: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
