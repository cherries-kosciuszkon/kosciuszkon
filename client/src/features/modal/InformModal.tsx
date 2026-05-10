import type { ReactNode } from 'react'
import { Modal, type ModalTitleTone } from './Modal'

export type InformModalProps = {
  open: boolean
  onClose: () => void
  title: string
  message: ReactNode
  variant?: ModalTitleTone
  confirmLabel?: string
}

export function InformModal({
  open,
  onClose,
  title,
  message,
  variant = 'info',
  confirmLabel = 'OK',
}: InformModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      titleTone={variant}
      footer={
        <button
          type="button"
          className="w-full rounded-xl bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-700 sm:w-auto"
          onClick={onClose}
        >
          {confirmLabel}
        </button>
      }
    >
      <div className="rounded-xl bg-black/40 p-4 text-sm leading-relaxed text-zinc-200 ring-1 ring-white/[0.06]">
        {message}
      </div>
    </Modal>
  )
}
