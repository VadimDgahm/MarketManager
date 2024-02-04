import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ControlledInput } from '@/components/controlled/controlledInput/controlledInput'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { Button } from '../../ui/button'

const passwordSchema = z
  .string()
  .min(3, 'Password has to be at least 3 characters long')
  .max(30, 'Password should be less than 30 characters')

const loginSchema = z
  .object({
    confirm: passwordSchema.min(1, 'Confirm your password'),
    email: z.string().email({ message: 'Invalid email address' }),
    password: passwordSchema,
  })
  .refine((data: { confirm: string; password: string }) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

type FormValues = z.infer<typeof loginSchema>

export const SingUpForm = ({ onSubmit }: { onSubmit: (data: FormValues) => void }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      confirm: '',
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })

  return (
    <>
      <Card className={s.signUpWrapper}>
        <Typography className={s.signUpTitle} variant={'large'}>
          Sign Up
        </Typography>
        <form className={s.signUpForm} onSubmit={handleSubmit(onSubmit)}>
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
          <ControlledInput
            className={s.confirmInput}
            control={control}
            label={'Confirm Password'}
            name={'confirm'}
            placeholder={'Confirm Password'}
            type={'password'}
          />
          <Button className={s.submitButton} fullWidth type={'submit'}>
            Sign Up
          </Button>
        </form>
        <Typography className={s.account} variant={'body2'}>
          Already have an account?
        </Typography>
        <Button as={Link} className={s.signInBtn} to={'/login'} variant={'link'}>
          <Typography className={s.signIn} variant={'link1'}>
            Sign In
          </Typography>
        </Button>
      </Card>
    </>
  )
}
