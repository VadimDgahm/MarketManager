import type { Meta, StoryObj } from '@storybook/react'

import defaultAvatar from '@/components/img/avatar.png'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

import { Header } from './header'

const meta = {
  component: Header,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/' },
    }),
  },
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const SignInHeader: Story = {
  args: {
    isLoggedIn: false,
  },
}

export const ProfileHeader: Story = {
  args: {
    avatar: defaultAvatar,
    email: 'eee@mail.ru',
    isLoggedIn: true,
    name: 'Ivan',
  },
}
