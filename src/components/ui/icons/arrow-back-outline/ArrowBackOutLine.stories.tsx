import type { Meta, StoryObj } from '@storybook/react'

import { ArrowBackOutLine } from '@/components/ui/icons/arrow-back-outline/ArrowBackOutline'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: ArrowBackOutLine,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof ArrowBackOutLine>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowBackOutLineIcon: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
