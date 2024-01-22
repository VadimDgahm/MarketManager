import type { Meta, StoryObj } from '@storybook/react'

import { Close } from './Close'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: Close,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof Close>

export default meta
type Story = StoryObj<typeof meta>

export const CloseIcon: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
