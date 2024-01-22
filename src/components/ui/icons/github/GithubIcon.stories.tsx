import type { Meta, StoryObj } from '@storybook/react'

import { GithubIcon } from './GithubIcon'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: GithubIcon,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof GithubIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Github: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
