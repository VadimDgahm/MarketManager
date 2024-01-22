import type { Meta, StoryObj } from '@storybook/react'

import { ArrowDown } from './ArrowDown'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: ArrowDown,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof ArrowDown>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowDownIcon: Story = {
  args: {
    color: '',
    onClick: () => alert('ку'),
  },
}
