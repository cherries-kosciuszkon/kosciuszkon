import { useId } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LOGO_SRC = '/logo_white.png'

/** Tytuł minigry dla ścieżki — rozszerz przy nowych routach. */
const ROUTE_GAME_TITLE: Record<string, string> = {
  '/chat': 'Symulacja czatu',
  '/sms-lab': 'SMS Lab',
  '/inbox-hero': 'Inbox Hero',
}

function BackIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

export type MiniGameNavbarProps = {
  /** Nadpisuje tytuł z mapy (np. gdy ścieżka nie jest na liście). */
  gameTitle?: string
}

/**
 * Pasek minigry: powrót (strzałka) | tytuł | logo — ten sam układ co wcześniej,
 * odświeżony wizualnie (wyśrodkowany tytuł, spójne odstępy, delikatny akcent).
 */
export function MiniGameNavbar({ gameTitle }: MiniGameNavbarProps) {
  const titleId = useId()
  const { pathname } = useLocation()
  const title =
    gameTitle ??
    ROUTE_GAME_TITLE[pathname] ??
    'Mini gra'

  return (
    <header
      className="relative bg-transparent pb-px"
      aria-labelledby={titleId}
    >
      {/* cienka linia pod całością — zamiast ciężkiego border-b */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-teal-500/12 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-4 py-2 sm:px-6 sm:py-2">
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3">
          <div className="flex justify-start">
            <Link
              to="/"
              className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-teal-500/25 bg-teal-500/[0.04] text-teal-400/90 transition hover:border-teal-500/40 hover:bg-teal-500/10 hover:text-teal-300 active:scale-[0.98] focus-visible:outline focus-visible:ring-2 focus-visible:ring-teal-500/45 focus-visible:ring-offset-1 focus-visible:ring-offset-black sm:h-9 sm:min-w-9"
              aria-label="Powrót na stronę główną"
            >
              <BackIcon className="h-4 w-4 -translate-x-px" />
            </Link>
          </div>

          <p
            id={titleId}
            className="mx-auto max-w-[min(100%,16rem)] truncate text-center text-xs font-normal leading-tight tracking-wide text-zinc-500 sm:max-w-md sm:text-sm"
          >
            {title}
          </p>

          <div className="flex justify-end">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg px-1.5 py-1 text-zinc-500 transition hover:bg-white/[0.03] hover:text-zinc-400 focus-visible:outline focus-visible:ring-2 focus-visible:ring-teal-500/35 focus-visible:ring-offset-1 focus-visible:ring-offset-black"
              aria-label="Kościuszkon — strona główna"
            >
              <img
                src={LOGO_SRC}
                alt=""
                className="h-5 w-auto max-w-[4.5rem] object-contain object-right opacity-75 sm:h-[1.35rem] sm:max-w-[5rem]"
                decoding="async"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
