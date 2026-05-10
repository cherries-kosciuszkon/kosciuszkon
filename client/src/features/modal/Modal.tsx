import { useEffect, useId, type ReactNode } from 'react'

export type ModalTitleTone = 'neutral' | 'success' | 'danger' | 'warning' | 'info'

const titleToneClass: Record<ModalTitleTone, string> = {
  neutral: 'text-zinc-100',
  success: 'text-emerald-400',
  danger: 'text-red-400',
  warning: 'text-amber-400',
  info: 'text-sky-400',
}

export type ModalProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  titleTone?: ModalTitleTone
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  /** When false, clicking the backdrop does not call onClose. Default true. */
  closeOnBackdrop?: boolean
  zIndexClass?: string
}

export function Modal({
  open,
  onClose,
  title,
  titleTone = 'neutral',
  description,
  children,
  footer,
  closeOnBackdrop = true,
  zIndexClass = 'z-[200]',
}: ModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const hasDescription = description != null && description !== false

  useEffect(() => {
    if (!open) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevBodyPaddingRight = body.style.paddingRight

    const scrollbarWidth = window.innerWidth - html.clientWidth
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      body.style.paddingRight = prevBodyPaddingRight
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={`fixed inset-0 ${zIndexClass} flex items-center justify-center overscroll-none bg-black/70 p-4 backdrop-blur-sm`}
      role="presentation"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title != null ? titleId : undefined}
        aria-describedby={hasDescription ? descriptionId : undefined}
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {title != null ? (
          <h2
            id={titleId}
            className={`text-xl font-bold ${titleToneClass[titleTone]}`}
          >
            {title}
          </h2>
        ) : null}
        {hasDescription ? (
          <p
            id={descriptionId}
            className="mt-2 text-sm text-zinc-400"
          >
            {description}
          </p>
        ) : null}
        {children != null ? <div className={title != null || hasDescription ? 'mt-4' : ''}>{children}</div> : null}
        {footer != null ? <div className="mt-6">{footer}</div> : null}
      </div>
    </div>
  )
}
