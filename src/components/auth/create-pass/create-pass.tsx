import { useForm } from 'react-hook-form'

import { ControlledInput } from '@/components/controlled/controlledInput/controlledInput'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './create-pass.module.scss'

const passCreationSchema = z.object({
  password: z
    .string()
    .min(3, 'Password has to be at least 3 characters long')
    .max(30, 'Password should be less than 30 characters'),
})

type FormValues = z.infer<typeof passCreationSchema>

export const CreatePass = ({ onSubmit }: { onSubmit: (data: FormValues) => void }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(passCreationSchema),
  })

  return (
    <>
      <DevTool control={control} />
      <Card className={s.wrapper}>
        <Typography className={s.title} variant={'large'}>
          Create new password
        </Typography>
        <form className={s.createPassForm} onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            className={s.emailInput}
            control={control}
            label={'Password'}
            name={'password'}
            placeholder={'Password'}
            type={'password'}
          />
          <Typography className={s.passInform} variant={'body2'}>
            Create new password and we will send you further instructions to email
          </Typography>
          <Button className={s.submitButton} fullWidth type={'submit'}>
            Create New Password
          </Button>
        </form>
      </Card>
    </>
  )
}

/*после создания роутера заменить в Button as a-> Link*/
