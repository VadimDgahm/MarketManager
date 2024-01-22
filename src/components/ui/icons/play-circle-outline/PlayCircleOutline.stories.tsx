import type { Meta, StoryObj } from '@storybook/react'

import { PlayCircleOutline } from './PlayCircleOutline'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: PlayCircleOutline,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof PlayCircleOutline>

export default meta
type Story = StoryObj<typeof meta>

export const PlayCircle1: Story = {
  args: {
    color: '',
    onClick: () => alert('ку'),
  },
}
