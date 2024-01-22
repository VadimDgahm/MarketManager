import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider } from '@/components/ui/slider/slider'

const meta = {
  argTypes: {},
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderView: Story = {
  args: {
    maxValue: 15,
    values: [0, 15],
  },
  render: () => {
    const [values, setValues] = useState({ max: 15, min: 0 })
    const onChangeHandler = (newValues: number[]) => {
      setValues({ max: newValues[1], min: newValues[0] })
    }

    return (
      <>
        <Slider
          maxValue={15}
          onSliderValuesChange={onChangeHandler}
          values={[values.min, values.max]}
        />
      </>
    )
  },
}
