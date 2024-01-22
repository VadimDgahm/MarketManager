import type { Meta, StoryObj } from '@storybook/react'

import NameEditor from './nameEditor'

const meta = {
  component: NameEditor,
  tags: ['autodocs'],
  title: 'Profile/NameEditor',
} satisfies Meta<typeof NameEditor>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultNameEditor: Story = {
  args: {
    name: 'name',
    onSubmit: data => console.info(data),
  },
}
