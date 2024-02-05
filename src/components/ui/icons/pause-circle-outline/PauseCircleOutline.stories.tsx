import type { Meta, StoryObj } from "@storybook/react";

import { PauseCircleOutline } from "./PauseCircleOutline";
// import { _ } from '@/components/ui/icons/home/HomeIcon.tsx'

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: PauseCircleOutline,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof PauseCircleOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PauseCircle1: Story = {
  args: {
    color: "",
    onClick: () => alert("ку"),
  },
};
