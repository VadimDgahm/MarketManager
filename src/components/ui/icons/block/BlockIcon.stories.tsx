import type { Meta, StoryObj } from '@storybook/react'

import { BlockIcon } from './BlockIcon'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: BlockIcon,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof BlockIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Block: Story = {
  args: {
    color: '',
    onClick: () => alert('ку'),
  },
}
