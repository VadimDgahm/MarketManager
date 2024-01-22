import type { Meta, StoryObj } from '@storybook/react'

import { MaximizeIcon } from './MaximizeIcon'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: MaximizeIcon,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof MaximizeIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Maximize2: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
