import type { Meta, StoryObj } from '@storybook/react'

import { PlusSquare } from './PlusSquare'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: PlusSquare,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof PlusSquare>

export default meta
type Story = StoryObj<typeof meta>

export const PlusSquare2: Story = {
  args: {
    color: '',
    onClick: () => alert('ку'),
  },
}
