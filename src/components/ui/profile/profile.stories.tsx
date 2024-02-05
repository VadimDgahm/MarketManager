import type { Meta, StoryObj } from "@storybook/react";

import { Profile } from "@/components/ui/profile/profile";

const meta = {
  component: Profile,
  tags: ["autodocs"],
  title: "Profile/Profile",
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultProfile: Story = {
  args: {
    email: "email@mail.ru",
    name: "name",
    onSubmit: (data) => console.info(data),
  },
};
