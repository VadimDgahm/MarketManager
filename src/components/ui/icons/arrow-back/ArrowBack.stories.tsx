import type { Meta, StoryObj } from '@storybook/react'

import { ArrowBack } from './ArrowBack'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: ArrowBack,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof ArrowBack>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowBackIcon: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
