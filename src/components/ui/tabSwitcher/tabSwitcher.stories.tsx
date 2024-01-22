import { useState } from 'react'

import { TabSwitcher } from '@/components/ui/tabSwitcher/tabSwitcher'
import { Meta, StoryObj } from '@storybook/react'

const collection = [
  {
    location: 'left',
    value: 'Switcher',
  },
  {
    location: 'center',
    value: 'Switcher',
  },
  {
    location: 'right',
    value: 'Switcher',
  },
]

const meta = {
  args: {
    valuesCollection: collection,
  },
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/TabSwitcher',
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

type DefaultSwitcherArgs = {
  disable: boolean
  value: string
  valuesCollection: { location: string; value: string }[]
}

type DefaultSwitcherStory = StoryObj<DefaultSwitcherArgs>

export const DefaultSwitcher: DefaultSwitcherStory = args => {
  const [value, setValue] = useState(args?.value || '')

  const handleValueChange = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabSwitcher
      disable={args.disable}
      onValueChange={handleValueChange}
      value={value}
      valuesCollection={args.valuesCollection}
    />
  )
}

DefaultSwitcher.args = {
  disable: false,
  value: 'left',
  valuesCollection: collection,
}

export const DisabledSwitcher: Story = {
  args: {
    disable: true,
    value: 'left',
  },
}
