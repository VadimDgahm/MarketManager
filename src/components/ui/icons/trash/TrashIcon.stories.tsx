import type { Meta, StoryObj } from '@storybook/react'

import { TrashIcon } from './TrashIcon'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: TrashIcon,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof TrashIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Trash2: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
