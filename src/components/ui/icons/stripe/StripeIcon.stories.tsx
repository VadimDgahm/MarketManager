import type { Meta, StoryObj } from "@storybook/react";

import { StripeIcon } from "./StripeIcon";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: StripeIcon,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof StripeIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stripe: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
