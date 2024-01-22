import type { Meta, StoryObj } from '@storybook/react'

import { HomeOutline } from './HomeOutline'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },

  component: HomeOutline,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof HomeOutline>

export default meta
type Story = StoryObj<typeof meta>

export const Home1: Story = {
  args: {
    color: '',
  },
}
