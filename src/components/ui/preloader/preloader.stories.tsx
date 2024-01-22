import type { Meta, StoryObj } from '@storybook/react'

import { Preloader } from '@/components/ui/preloader/preloader'

const meta = {
  component: Preloader,
  tags: ['autodocs'],
  title: 'Components/Preloader',
} satisfies Meta<typeof Preloader>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLoader: Story = {}
