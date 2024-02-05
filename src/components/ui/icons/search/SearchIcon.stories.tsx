import type { Meta, StoryObj } from "@storybook/react";

import { SearchIcon } from "./SearchIcon";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: SearchIcon,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof SearchIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Search: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
