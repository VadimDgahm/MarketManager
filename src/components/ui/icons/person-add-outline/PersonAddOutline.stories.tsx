import type { Meta, StoryObj } from '@storybook/react'

import { PersonAddOutline } from './PersonAddOutline'

const meta = {
  argTypes: {
    version: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  component: PersonAddOutline,
  tags: ['autodocs'],
  title: 'Components/Icons',
} satisfies Meta<typeof PersonAddOutline>

export default meta
type Story = StoryObj<typeof meta>

export const PersonAdd1: Story = {
  args: {
    color: '',

    onClick: () => alert('ку'),
  },
}
