import type { Meta, StoryObj } from '@storybook/react'

import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

import { CheckEmail } from './check-email'

const meta = {
  component: CheckEmail,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/check-email' },
    }),
  },
  tags: ['autodocs'],
  title: 'Auth/CheckEmail',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    email: 'example@mail.com',
  },
}
