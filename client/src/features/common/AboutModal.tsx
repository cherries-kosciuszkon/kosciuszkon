import { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

function InfoIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  // Obsługa klawisza Escape wewnątrz komponentu
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-black/70 p-4 pb-8 backdrop-blur-sm sm:items-center sm:pb-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-dialog-title"
        className="flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-5 text-left shadow-2xl ring-1 ring-white/10 sm:px-6 sm:py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-teal-400">
            <InfoIcon className="h-6 w-6 shrink-0" />
            <h2 id="about-dialog-title" className="text-lg font-semibold tracking-tight text-zinc-50">
              O projekcie
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200 focus-visible:outline focus-visible:ring-2 focus-visible:ring-teal-400"
            aria-label="Zamknij"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mt-4 shrink-0 text-sm leading-relaxed text-zinc-400">
          Zestaw minigier edukacyjnych w cyberbezpieczeństwie — uczysz się rozpoznawać manipulację i oszustwa w
          bezpiecznym, symulowanym środowisku.
        </p>

        {/* Sekcja ze scrollbarem */}
        <div
          className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [-ms-overflow-style:auto] [scrollbar-color:rgb(63_63_70)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-zinc-900 [&::-webkit-scrollbar-thumb]:bg-zinc-700 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
          role="region"
          aria-label="Lista minigier"
        >
          <ul className="space-y-4 text-sm text-zinc-300 pb-1">
            <li className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 ring-1 ring-white/[0.04]">
              <p className="font-medium text-zinc-100">Czat</p>
              <p className="mt-1 leading-relaxed text-zinc-400">
                Rozmowa z drugą stroną na aukcji — musisz ocenić, czy to <span className="text-zinc-300">oszust</span>,
                czy <span className="text-zinc-300">uczciwy sprzedawca</span>.
              </p>
              <Link to="/chat" className="mt-2 inline-block text-teal-400 hover:text-teal-300" onClick={onClose}>
                Przejdź do czatu →
              </Link>
            </li>

            <li className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 ring-1 ring-white/[0.04]">
              <p className="font-medium text-zinc-100">SMS Lab</p>
              <p className="mt-1 leading-relaxed text-zinc-400">
                Jedna wiadomość SMS jak z telefonu — decyzja: oszustwo czy uczciwy komunikat? Po wyborze dostajesz
                wyjaśnienie.
              </p>
              <Link to="/sms-lab" className="mt-2 inline-block text-teal-400 hover:text-teal-300" onClick={onClose}>
                Otwórz SMS Lab →
              </Link>
            </li>

            <li className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 ring-1 ring-white/[0.04]">
              <p className="font-medium text-zinc-100">Inbox Hero</p>
              <p className="mt-1 leading-relaxed text-zinc-400">
                Gra/symulacja związana ze skrzynką wiadomości — trening czujności na podejrzane treści i nadawców.
              </p>
              <Link to="/inbox-hero" className="mt-2 inline-block text-teal-400 hover:text-teal-300" onClick={onClose}>
                Inbox Hero →
              </Link>
            </li>

            <li className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950/30 px-4 py-3 ring-1 ring-white/[0.04]">
              <p className="font-medium text-zinc-100">Sklep online (w przygotowaniu)</p>
              <p className="mt-1 leading-relaxed text-zinc-500">
                Symulowana strona e-commerce: wykrywanie zagrożeń — m.in. podejrzane reklamy, fałszywe promocje i
                elementy ukrywające intencję sprzedawcy.
              </p>
            </li>
          </ul>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 shrink-0 w-full rounded-xl bg-zinc-800 py-2.5 text-sm font-medium text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-700"
        >
          Zamknij
        </button>
      </div>
    </div>
  )
}