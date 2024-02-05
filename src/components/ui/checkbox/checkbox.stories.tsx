import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./index";

const meta = {
  argTypes: {},
  component: Checkbox,
  tags: ["autodocs"],
  title: "Components/Checkbox",
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxView: Story = {
  args: {
    checked: true,
    disabled: false,
    label: "Check-box",
    onValueChange: (check) => {
      alert(`the checkbox will want to change to "${check}"`);
    },
  },
};

export const TwoCheckboxes: Story = {
  render: () => {
    return (
      <div>
        <Checkbox label={"check1"} />
        <Checkbox label={"check2"} />
      </div>
    );
  },
};
