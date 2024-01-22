import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPass } from '@/components/auth/pass-recovery/pass-recovery'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

const meta = {
  component: ForgotPass,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/forgot-password' },
    }),
  },
  tags: ['autodocs'],
  title: 'Auth/ForgotPass',
} satisfies Meta<typeof ForgotPass>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
