import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { apiURL } from '../../../api/apiURL'
import type { SmsRoundResult, SmsScenario } from '../types'

export type SmsChatViewHandle = {
  loadNextScenario: () => void
}

export type SmsChatViewProps = {
  onRoundResult?: (result: SmsRoundResult) => void
  /** Gdy strona nadrzędna pokazuje modal wyniku — ukrywa „Losuj kolejny” dopóki modal jest otwarty. */
  resultModalOpen?: boolean
  /** Wywoływane na początku `loadNextScenario` — strona może zamknąć modal wyniku. */
  onDismissRoundResult?: () => void
}

export const SmsChatView = forwardRef<SmsChatViewHandle, SmsChatViewProps>(
  function SmsChatView(
    { onRoundResult, resultModalOpen = false, onDismissRoundResult },
    ref,
  ) {
    const [scenario, setScenario] = useState<SmsScenario | null>(null)
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [roundLocked, setRoundLocked] = useState(false)

    const onDismissRoundResultRef = useRef(onDismissRoundResult)
    const onRoundResultRef = useRef(onRoundResult)
    onDismissRoundResultRef.current = onDismissRoundResult
    onRoundResultRef.current = onRoundResult

    const loadRandom = useCallback(async () => {
      onDismissRoundResultRef.current?.()
      setLoading(true)
      setFetchError(null)
      setRoundLocked(false)
      try {
        const res = await fetch(apiURL.smsRandom)
        if (!res.ok) throw new Error('Nie udało się pobrać scenariusza.')
        const data = (await res.json()) as SmsScenario
        setScenario(data)
      } catch {
        setFetchError('Błąd połączenia z serwerem. Uruchom API i spróbuj ponownie.')
        setScenario(null)
      } finally {
        setLoading(false)
      }
    }, [])

    useImperativeHandle(
      ref,
      () => ({
        loadNextScenario: () => void loadRandom(),
      }),
      [loadRandom],
    )

    useEffect(() => {
      void loadRandom()
    }, [loadRandom])

    function handleGuess(userChoseScam: boolean) {
      if (!scenario || roundLocked) return
      const correct = userChoseScam === scenario.isScam
      setRoundLocked(true)
      onRoundResultRef.current?.({
        userChoseScam,
        correct,
        explanation: scenario.explanation,
      })
    }

    return (
      <div className="flex w-full flex-col items-center gap-8 px-4 py-8">
        <div
          className="relative w-full max-w-sm overflow-hidden rounded-[3rem] border-[10px] border-zinc-800 bg-zinc-950 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/[0.07]"
          aria-label="Symulowany ekran telefonu z wiadomością SMS"
        >
          <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black/80" />

          <div className="flex min-h-[40rem] flex-col bg-gradient-to-b from-zinc-900 to-black pt-10">
            <header className="flex shrink-0 items-center gap-2 border-b border-white/[0.08] bg-zinc-900/90 px-3 py-3 backdrop-blur-sm">
              <span
                className="text-zinc-500"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </span>
              <div className="min-w-0 flex-1 text-center">
                <p className="truncate text-sm font-semibold text-zinc-100">
                  {loading ? 'Ładowanie…' : scenario?.sender ?? '—'}
                </p>
                <p className="text-[11px] text-zinc-500">SMS i MMS</p>
              </div>
              <span className="w-6" aria-hidden="true" />
            </header>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4">
              {fetchError && (
                <p className="rounded-2xl bg-red-950/50 px-3 py-2 text-center text-sm text-red-200 ring-1 ring-red-500/30">
                  {fetchError}
                </p>
              )}
              {!loading && scenario && (
                <div className="flex justify-start">
                  <div
                    className="max-w-[92%] rounded-2xl rounded-bl-md bg-zinc-800/95 px-3.5 py-2.5 text-[0.9375rem] leading-relaxed text-zinc-100 shadow-md ring-1 ring-white/[0.06]"
                    role="article"
                    aria-label="Treść wiadomości SMS"
                  >
                    <p className="whitespace-pre-wrap break-words select-text [overflow-wrap:anywhere]">
                      {scenario.content}
                    </p>
                  </div>
                </div>
              )}
              {loading && (
                <div className="flex justify-center py-12">
                  <span className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
                </div>
              )}
            </div>

            <div className="shrink-0 border-t border-white/[0.08] bg-zinc-900/95 p-2 pb-6">
              <div className="flex items-end gap-2 rounded-3xl bg-zinc-800/80 px-3 py-2 ring-1 ring-white/[0.06]">
                <label htmlFor="sms-lab-input" className="sr-only">
                  Pole wiadomości (symulacja — tylko do wyglądu)
                </label>
                <textarea
                  id="sms-lab-input"
                  readOnly
                  rows={1}
                  value=""
                  placeholder="Wiadomość SMS"
                  className="max-h-24 min-h-[2.5rem] w-full resize-none bg-transparent py-2 text-sm text-zinc-400 placeholder:text-zinc-600 focus:outline-none"
                />
                <span
                  className="mb-2 shrink-0 rounded-full bg-teal-600/40 px-2 py-1 text-[10px] font-medium text-teal-200/80"
                  aria-hidden="true"
                >
                  SMS Lab
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-sm flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              disabled={loading || !scenario || roundLocked}
              onClick={() => handleGuess(true)}
              className="min-h-11 flex-1 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-300 ring-0 transition hover:scale-[1.02] hover:border-rose-500/80 hover:bg-rose-500/20 hover:text-rose-100 hover:ring-1 hover:ring-rose-500/35 hover:shadow-md hover:shadow-black/20 active:scale-[0.98] focus-visible:outline focus-visible:ring-2 focus-visible:ring-rose-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:bg-zinc-900"
            >
              Oszust
            </button>
            <button
              type="button"
              disabled={loading || !scenario || roundLocked}
              onClick={() => handleGuess(false)}
              className="min-h-11 flex-1 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-300 ring-0 transition hover:scale-[1.02] hover:border-emerald-500/80 hover:bg-emerald-500/20 hover:text-emerald-100 hover:ring-1 hover:ring-emerald-500/35 hover:shadow-md hover:shadow-black/20 active:scale-[0.98] focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:bg-zinc-900"
            >
              Uczciwy
            </button>
          </div>
          {roundLocked && !resultModalOpen && (
            <button
              type="button"
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900/80 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
              onClick={() => void loadRandom()}
            >
              Losuj kolejny SMS
            </button>
          )}
        </div>

        <p className="max-w-sm text-center text-xs leading-relaxed text-zinc-500">
          Adresy w treści są celowo wyświetlane jako zwykły tekst — nie są linkami,
          żeby uniknąć przypadkowego przejścia na zewnątrz aplikacji.
        </p>
      </div>
    )
  },
)

SmsChatView.displayName = 'SmsChatView'
