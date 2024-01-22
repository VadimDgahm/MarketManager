import type { Meta, StoryObj } from '@storybook/react'

import { CreatePass } from '@/components/auth/create-pass/create-pass'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

const meta = {
  component: CreatePass,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/create-password' },
    }),
  },
  tags: ['autodocs'],
  title: 'Auth/CreatePass',
} satisfies Meta<typeof CreatePass>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
