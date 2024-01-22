import type { Meta, StoryObj } from '@storybook/react'

import { RadioWithRating } from '@/components/ui/radioWithRating/radioWithRating'

const meta = {
  component: RadioWithRating,
  tags: ['autodocs'],
  title: 'Components/RadioWithRating',
} satisfies Meta<typeof RadioWithRating>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultRateWithRadio: Story = {}
