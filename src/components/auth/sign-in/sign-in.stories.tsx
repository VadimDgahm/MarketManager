import type { Meta, StoryObj } from "@storybook/react";

import { LoginForm } from "@/components/auth/sign-in/sign-in";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-react-router-v6";

const meta = {
  component: LoginForm,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/login" },
    }),
  },
  tags: ["autodocs"],
  title: "Auth/LoginForm",
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: (data) => console.info(data),
  },
};
