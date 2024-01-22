import type { Meta, StoryObj } from '@storybook/react'

import { MicIcon } from './MicIcon'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: MicIcon,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof MicIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Mic2: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
