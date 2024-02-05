import type { Meta, StoryObj } from "@storybook/react";

import { HomeIcon } from "./HomeIcon";
// import { _ } from '@/components/ui/icons/home/HomeIcon.tsx'

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: HomeIcon,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof HomeIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home2: Story = {
  args: {
    color: "",
    onClick: () => alert("ку"),
  },
};
