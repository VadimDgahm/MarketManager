import type { Meta, StoryObj } from "@storybook/react";

import { RecaptchaIcon } from "./RecaptchaIcon";

const meta = {
  argTypes: {
    version: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
  },
  component: RecaptchaIcon,
  tags: ["autodocs"],
  title: "Components/Icons",
} satisfies Meta<typeof RecaptchaIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recaptcha: Story = {
  args: {
    color: "",

    onClick: () => alert("ку"),
  },
};
