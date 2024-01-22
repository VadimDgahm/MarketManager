import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography'

import ModalWithContent from './modalWithContent'

const meta = {
  component: ModalWithContent,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof ModalWithContent>

export default meta
type Story = StoryObj<typeof meta>

export const ModalWithContentDefault: Story = {
  args: {
    children: (
      <Typography variant={'body2'}>
        Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod temper ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est labor.
      </Typography>
    ),
  },
}
