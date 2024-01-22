import type { Meta, StoryObj } from '@storybook/react'

import { ImageIcon } from './ImageIcon'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: ImageIcon,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof ImageIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Image2: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
