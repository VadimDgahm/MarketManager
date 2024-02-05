import type { Meta, StoryObj } from "@storybook/react";

import { Bookmark } from "./Bookmark";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: Bookmark,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof Bookmark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bookmark2: Story = {
  args: {
    color: "",
    onClick: () => alert("ку"),
  },
};
