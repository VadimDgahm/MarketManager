import type { Meta, StoryObj } from "@storybook/react";

import { LayersOutline } from "./LayersOutline";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: LayersOutline,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof LayersOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Layers1: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
