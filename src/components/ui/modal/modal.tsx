import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import ModalTitle from './modalTitle/modalTitle'

export type ModalProps = {
  children: ReactNode
  className?: string
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof Dialog.Root>, 'children'>

const Modal = forwardRef<ElementRef<'div'>, ModalProps>(
  ({ children, onOpenChange, open, title, ...rest }, ref) => {
    return (
      <Dialog.Root onOpenChange={onOpenChange} open={open} {...rest}>
        <Dialog.Portal>
          <Dialog.Overlay className={`${s.DialogOverlay}`} />
          <Dialog.Content className={`${s.DialogContent}`} ref={ref}>
            {title && (
              <ModalTitle className={s.borderTitle} onOpenChange={onOpenChange} title={title} />
            )}
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }
)

export default Modal
