import type { Meta, StoryObj } from '@storybook/react'

import { SingUpForm } from '@/components/auth/sign-up/sign-up'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

const meta = {
  component: SingUpForm,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/sign-up' },
    }),
  },
  tags: ['autodocs'],
  title: 'Auth/SingUpForm',
} satisfies Meta<typeof SingUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
