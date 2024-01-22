import type { Meta, StoryObj } from '@storybook/react'

import { StarOutline } from './StarOutline'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: StarOutline,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof StarOutline>

export default meta
type Story = StoryObj<typeof meta>

export const Star1: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
