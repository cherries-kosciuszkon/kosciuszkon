import type { ReactNode } from 'react'
import { Modal } from './Modal'

export type ResultModalProps = {
  open: boolean
  onClose: () => void
  success: boolean
  subtitle: string
  explanation: ReactNode
  nextAction?: { label: string; onClick: () => void }
  title?: string
  closeLabel?: string
}

export function ResultModal({
  open,
  onClose,
  success,
  subtitle,
  explanation,
  nextAction,
  title: titleOverride,
  closeLabel = 'Zamknij',
}: ResultModalProps) {
  const heading = titleOverride ?? (success ? 'Dobrze!' : 'Źle')

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={heading}
      titleTone={success ? 'success' : 'danger'}
      description={subtitle}
      footer={
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="flex-1 rounded-xl bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-700"
            onClick={onClose}
          >
            {closeLabel}
          </button>
          {nextAction ? (
            <button
              type="button"
              className="flex-1 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:brightness-110"
              onClick={nextAction.onClick}
            >
              {nextAction.label}
            </button>
          ) : null}
        </div>
      }
    >
      <div className="rounded-xl bg-black/40 p-4 text-sm leading-relaxed text-zinc-200 ring-1 ring-white/[0.06]">
        {explanation}
      </div>
    </Modal>
  )
}
