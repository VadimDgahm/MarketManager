import type { Meta, StoryObj } from '@storybook/react'

import { ArrowForward } from './ArrowForward'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: ArrowForward,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof ArrowForward>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowForwardIcon: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
