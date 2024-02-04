import Modal from '@/components/ui/modal/modal'
import ModalWithButton from '@/components/ui/modal/modalWithButton/modalWithButton'
import ModalWithContent from '@/components/ui/modal/modalWithContent/modalWithContent'

type PropsType = {
  name: string | undefined
  open: boolean
  removeHandler: () => void
  setOpen: (isOpen: boolean) => void
  title: string
}
export const DeleteModal = ({ name, open, removeHandler, setOpen, title }: PropsType) => {
  return (
    <Modal onOpenChange={setOpen} open={open} title={title}>
      <ModalWithContent>
        Вы действительно хотитет удалить {name}?
      </ModalWithContent>
      <ModalWithButton
        onClickPrimaryButton={removeHandler}
        onClickSecondaryButton={() => setOpen(false)}
        titleButton={'Удалить клиента'}
      />
    </Modal>
  )
}
