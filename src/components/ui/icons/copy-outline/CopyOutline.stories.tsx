import type { Meta, StoryObj } from '@storybook/react'

import { CopyOutline } from './CopyOutline'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: CopyOutline,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof CopyOutline>

export default meta
type Story = StoryObj<typeof meta>

export const Copy1: Story = {
  args: {
    color: '',
    onClick: () => alert('ку'),
  },
}
