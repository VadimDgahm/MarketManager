import type { Meta, StoryObj } from "@storybook/react";

import { PersonRemove } from "./PersonRemove";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: PersonRemove,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof PersonRemove>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PersonRemove2: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
