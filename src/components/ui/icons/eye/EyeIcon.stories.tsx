import type { Meta, StoryObj } from '@storybook/react'

import { EyeIcon } from './EyeIcon'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: EyeIcon,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof EyeIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Eye2: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
