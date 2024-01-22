import type { Meta, StoryObj } from '@storybook/react'

import { EmailOutline } from './EmailOutline'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: EmailOutline,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof EmailOutline>

export default meta
type Story = StoryObj<typeof meta>

export const Email1: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
