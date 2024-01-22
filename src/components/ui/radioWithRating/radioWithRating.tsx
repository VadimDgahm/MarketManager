import { useForm } from 'react-hook-form'

import { ControlledRadio } from '@/components/controlled/controlledRadio/controlledRadio'
import { Button } from '@/components/ui/button'
import { RadioValues } from '@/components/ui/radioGroup'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './radioWithRating.module.scss'

const radioSchema = z.object({
  grade: z.string(),
})

export type FormValues = z.infer<typeof radioSchema>

const values: RadioValues[] = [
  { grade: 1, value: 'Did not know' },
  { grade: 2, value: 'Forgot' },
  { grade: 3, value: 'A lot of though' },
  {
    grade: 4,
    value: 'Confused',
  },
  { grade: 5, value: 'Knew the answer' },
]

export const RadioWithRating = ({ onSubmit }: { onSubmit: (data: FormValues) => void }) => {
  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      grade: undefined,
    },
    mode: 'onSubmit',
    resolver: zodResolver(radioSchema),
  })

  const handleFormSubmit = () => {
    const selectedGrade = watch('grade')
    const selectedValue = values.find(value => value.value === selectedGrade)

    if (selectedValue) {
      const data: FormValues = {
        grade: selectedValue.grade.toString(),
      }

      onSubmit(data)
    }
  }

  return (
    <>
      <Typography className={s.title} variant={'subtitle1'}>
        Rate yourself:
      </Typography>
      <div className={s.radioForm}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ControlledRadio
            className={s.radioGroupItems}
            control={control}
            name={'grade'}
            onValueChange={value => setValue('grade', value)}
            options={values}
          />
          <Button className={s.nextButton} type={'submit'}>
            Next Question
          </Button>
        </form>
      </div>
    </>
  )
}
