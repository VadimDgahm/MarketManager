import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

export const Slider = forwardRef<
  ElementRef<typeof SliderRadix.Root>,
  ComponentPropsWithoutRef<typeof SliderRadix.Root> & {
    maxValue: number

    onSliderValuesChange: (values: number[]) => void
    values: number[]
  }
>(({ maxValue, onSliderValuesChange, values, ...rest }, ref) => {
  const onValueChangeHandler = (numbers: number[]) => {
    onSliderValuesChange(numbers)
  }

  return (
    <div className={s.SliderStyle}>
      <Typography className={s.SliderNumbers} variant={'body1'}>
        {values[0]}
      </Typography>
      <SliderRadix.Root
        className={s.SliderRoot}
        max={maxValue}
        onValueChange={onValueChangeHandler}
        ref={ref}
        step={1}
        value={values}
        {...rest}
      >
        <SliderRadix.Track className={s.SliderTrack}>
          <SliderRadix.Range className={s.SliderRange} />
        </SliderRadix.Track>

        <SliderRadix.Thumb className={s.SliderThumb} />

        <SliderRadix.Thumb className={s.SliderThumb} />
      </SliderRadix.Root>
      <Typography className={s.SliderNumbers} variant={'body1'}>
        {values[1]}
      </Typography>
    </div>
  )
})
