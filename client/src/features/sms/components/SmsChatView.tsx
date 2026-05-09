import { useCallback, useEffect, useState } from 'react'
import { apiURL } from '../../../api/apiURL'
import type { SmsScenario } from '../types'

type ResultModalState = {
  userChoseScam: boolean
  correct: boolean
  explanation: string
}

export function SmsChatView() {
  const [scenario, setScenario] = useState<SmsScenario | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [modal, setModal] = useState<ResultModalState | null>(null)
  const [roundLocked, setRoundLocked] = useState(false)

  const loadRandom = useCallback(async () => {
    setLoading(true)
    setFetchError(null)
    setModal(null)
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

  useEffect(() => {
    void loadRandom()
  }, [loadRandom])

  function handleGuess(userChoseScam: boolean) {
    if (!scenario || roundLocked) return
    const correct = userChoseScam === scenario.isScam
    setRoundLocked(true)
    setModal({
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
            className="flex-1 rounded-2xl border border-red-500/40 bg-red-950/50 px-5 py-3.5 text-sm font-semibold text-red-100 shadow-lg shadow-red-950/30 transition hover:bg-red-900/50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 disabled:pointer-events-none disabled:opacity-40"
          >
            Oszust
          </button>
          <button
            type="button"
            disabled={loading || !scenario || roundLocked}
            onClick={() => handleGuess(false)}
            className="flex-1 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 px-5 py-3.5 text-sm font-semibold text-emerald-100 shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-900/35 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:pointer-events-none disabled:opacity-40"
          >
            Uczciwy
          </button>
        </div>
        {roundLocked && !modal && (
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

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sms-lab-result-title"
            className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="sms-lab-result-title"
              className={`text-xl font-bold ${
                modal.correct ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {modal.correct ? 'Dobrze!' : 'Źle'}
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              {modal.correct
                ? 'Trafnie oceniłeś wiadomość.'
                : 'To nie była właściwa klasyfikacja — zobacz wyjaśnienie poniżej.'}
            </p>
            <div className="mt-4 rounded-xl bg-black/40 p-4 text-sm leading-relaxed text-zinc-200 ring-1 ring-white/[0.06]">
              {modal.explanation}
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="flex-1 rounded-xl bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-700"
                onClick={() => setModal(null)}
              >
                Zamknij
              </button>
              <button
                type="button"
                className="flex-1 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:brightness-110"
                onClick={() => void loadRandom()}
              >
                Kolejna wiadomość
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
