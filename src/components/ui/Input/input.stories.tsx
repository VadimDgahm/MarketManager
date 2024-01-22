import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '@/components/ui/Input'

const meta = {
  argTypes: {
    errorMessage: {
      control: 'text',
      description: 'Error Message',
    },
  },
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputDefault: Story = {
  args: {
    disabled: false,
    placeholder: 'Input',
    title: 'Input',
  },
}
export const InputPassword: Story = {
  args: {
    disabled: false,
    placeholder: 'Password',
    type: 'password',
  },
}

export const InputSearch: Story = {
  args: {
    disabled: false,
    placeholder: 'Search',
    title: 'Input',
    type: 'search',
  },
}
