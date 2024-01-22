import type { Meta, StoryObj } from '@storybook/react'

import { EyeOutline } from './EyeOutline'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: EyeOutline,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof EyeOutline>

export default meta
type Story = StoryObj<typeof meta>

export const Eye1: Story = {
  args: {
    onClick: () => alert('ку'),
  },
}
