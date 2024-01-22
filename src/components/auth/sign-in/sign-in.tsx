import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ControlledCheckbox } from '@/components/controlled/controlledCheckbox/controlledCheckbox'
import { ControlledInput } from '@/components/controlled/controlledInput/controlledInput'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

import { Button } from '../../ui/button'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(3, 'Password has to be at least 3 characters long')
    .max(30, 'Password should be less than' + ' 30 characters'),
  rememberMe: z.boolean(),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = ({ onSubmit }: { onSubmit: (data: FormValues) => void }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })

  return (
    <>
      <DevTool control={control} />
      <Card className={s.signInWrapper}>
        <Typography className={s.signInTitle} variant={'large'}>
          Sign in
        </Typography>
        <form className={s.signInForm} onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            className={s.emailInput}
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'Email'}
          />
          <ControlledInput
            className={s.passwordInput}
            control={control}
            label={'Password'}
            name={'password'}
            placeholder={'Password'}
            type={'password'}
          />
          <ControlledCheckbox
            className={s.checkbox}
            control={control}
            label={'remember Me'}
            name={'rememberMe'}
          />
          <Typography
            as={Link}
            className={s.repairPassword}
            to={'/forgot-password'}
            variant={'body2'}
          >
            Forgot Password?
          </Typography>
          <Button className={s.submitButton} type={'submit'}>
            Sign In
          </Button>
        </form>
        <Typography className={s.account} variant={'body2'}>
          Don&apos;t have an account?
        </Typography>
        <Button as={Link} to={'/sign-up'} variant={'link'}>
          <Typography className={s.signUp} variant={'link1'}>
            Sign Up
          </Typography>
        </Button>
      </Card>
    </>
  )
}
