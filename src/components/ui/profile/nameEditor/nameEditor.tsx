import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledInput } from '@/components/controlled/controlledInput/controlledInput'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '@/components/ui/profile/nameEditor/nameEditor.module.scss'

const nameSchema = z.object({
  name: z
    .string()
    .min(3, 'Name has to be at least 3 characters long')
    .max(30, 'Name should be less than' + ' 30 characters'),
})

export type FormValues = z.infer<typeof nameSchema>

type EditorProps = {
  name?: string
  onSubmit: (data: FormValues) => void
}

const NameEditor: FC<EditorProps> = ({ name, onSubmit }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: name,
    },
    mode: 'onSubmit',
    resolver: zodResolver(nameSchema),
  })

  return (
    <>
      <form className={s.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput className={s.input} control={control} label={'Nickname'} name={'name'} />
        <Button className={s.submitButton} fullWidth type={'submit'}>
          Save Changes
        </Button>
      </form>
    </>
  )
}

export default NameEditor
