import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup, RadioValues } from './radioGroup'

const options: RadioValues[] = [
  { grade: 1, value: 'Did not know' },
  { grade: 2, value: 'Forgot' },
  { grade: 3, value: 'A lot of though' },
  {
    grade: 4,
    value: 'Confused',
  },
  { grade: 5, value: 'Knew the answer' },
]

const meta = {
  argTypes: {
    options,
  },
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
    options,
  },
}

export const DefaultDisable: Story = {
  args: {
    disabled: true,
    options,
  },
}

export const RadioWithError: Story = {
  args: {
    disabled: true,
    errorMessage: 'You are doing smth wrong',
    options,
  },
}
