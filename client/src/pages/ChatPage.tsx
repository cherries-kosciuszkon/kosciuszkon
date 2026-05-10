import { useCallback, useState } from 'react'
import { MiniGameNavbar } from '../features/common/MiniGameNavbar'
import { ChatPanel } from '../features/chat/components/ChatPanel'
import { createRandomChatPrompt } from '../features/chat/hooks/useRandomPrompt'
import { ResultModal } from '../features/modal'

type ChatVerdictResult = {
  userChoseScam: boolean
  correct: boolean
  explanation: string
}

function verdictExplanation(
  sellerWasScammer: boolean,
  userChoseScammer: boolean,
  correct: boolean,
): string {
  if (correct) {
    return sellerWasScammer
      ? 'W tej symulacji sprzedawca był ustawiony jako oszust. Dobrze, że to wyłapałeś — w prawdziwych ogłoszeniach szukaj pośpiechu, dziwnych kanałów płatności i sprzeczności w opisie.'
      : 'W tej rundzie sprzedawca był uczciwy. Spójne odpowiedzi i brak nacisku na podejrzaną płatność to dobry znak — i tak zawsze weryfikuj ofertę niezależnie.'
  }
  if (sellerWasScammer && !userChoseScammer) {
    return 'Tu symulowany sprzedawca był oszustem. Warto wrócić do rozmowy i poszukać sygnałów typu presja czasowa, prośba o przedpłatę „na zaufanie” albo zmiana warunków w trakcie.'
  }
  return 'W tej rundzie sprzedawca był uczciwy — subtelność rozmowy mogła wprowadzić w błąd. Uczciwy sprzedawca zwykle odpowiada konkretnie i nie forsował dziwnych metod zapłaty.'
}

export default function ChatPage() {
  const [sessionPrompt, setSessionPrompt] = useState(createRandomChatPrompt)
  const [verdictReady, setVerdictReady] = useState(false)
  const [roundLocked, setRoundLocked] = useState(false)
  const [roundResult, setRoundResult] = useState<ChatVerdictResult | null>(null)

  const startNewRound = useCallback(() => {
    setRoundResult(null)
    setRoundLocked(false)
    setSessionPrompt(createRandomChatPrompt())
  }, [])

  function handleGuess(userChoseScammer: boolean) {
    if (!verdictReady || roundLocked) return
    const correct = userChoseScammer === sessionPrompt.isScammer
    setRoundLocked(true)
    setRoundResult({
      userChoseScam: userChoseScammer,
      correct,
      explanation: verdictExplanation(
        sessionPrompt.isScammer,
        userChoseScammer,
        correct,
      ),
    })
  }

  return (
    <div className="min-h-dvh bg-black text-zinc-100 antialiased">
      <MiniGameNavbar />
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <ChatPanel
          className="min-h-[20rem] h-[min(32rem,calc(100dvh-13rem))] sm:h-[min(36rem,calc(100dvh-12rem))]"
          sessionPrompt={sessionPrompt}
          onVerdictReadyChange={setVerdictReady}
        />

        <div className="mx-auto mt-5 flex w-full max-w-sm flex-col gap-3 sm:mt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              disabled={!verdictReady || roundLocked}
              onClick={() => handleGuess(true)}
              className="min-h-11 flex-1 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-300 ring-0 transition hover:scale-[1.02] hover:border-rose-500/80 hover:bg-rose-500/20 hover:text-rose-100 hover:ring-1 hover:ring-rose-500/35 hover:shadow-md hover:shadow-black/20 active:scale-[0.98] focus-visible:outline focus-visible:ring-2 focus-visible:ring-rose-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:bg-zinc-900 disabled:pointer-events-none disabled:opacity-40"
            >
              Oszust
            </button>
            <button
              type="button"
              disabled={!verdictReady || roundLocked}
              onClick={() => handleGuess(false)}
              className="min-h-11 flex-1 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-300 ring-0 transition hover:scale-[1.02] hover:border-emerald-500/80 hover:bg-emerald-500/20 hover:text-emerald-100 hover:ring-1 hover:ring-emerald-500/35 hover:shadow-md hover:shadow-black/20 active:scale-[0.98] focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:bg-zinc-900 disabled:pointer-events-none disabled:opacity-40"
            >
              Uczciwy
            </button>
          </div>
          {roundLocked && roundResult === null ? (
            <button
              type="button"
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900/80 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
              onClick={startNewRound}
            >
              Nowa rozmowa
            </button>
          ) : null}
        </div>
      </div>

      {roundResult ? (
        <ResultModal
          open
          onClose={() => setRoundResult(null)}
          success={roundResult.correct}
          subtitle={
            roundResult.correct
              ? 'Trafnie oceniłeś sprzedawcę.'
              : 'To nie była właściwa ocena — zobacz krótką podpowiedź poniżej.'
          }
          explanation={roundResult.explanation}
          nextAction={{
            label: 'Kolejna rozmowa',
            onClick: () => {
              setRoundResult(null)
              startNewRound()
            },
          }}
        />
      ) : null}
    </div>
  )
}
