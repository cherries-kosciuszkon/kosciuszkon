import { useRef, useState } from 'react'
import { MiniGameNavbar } from '../features/common/MiniGameNavbar'
import { ResultModal } from '../features/modal'
import {
  SmsChatView,
  type SmsChatViewHandle,
} from '../features/sms/components/SmsChatView'
import type { SmsRoundResult } from '../features/sms/types'

export default function SmsLabPage() {
  const chatRef = useRef<SmsChatViewHandle>(null)
  const [roundResult, setRoundResult] = useState<SmsRoundResult | null>(null)

  return (
    <div className="min-h-dvh bg-black text-zinc-100 antialiased">
      <MiniGameNavbar />
      <div className="mx-auto max-w-lg px-4 pb-12 pt-6">
        <p className="mb-6 text-center text-sm text-zinc-500">
          Edukacja: czy ta wiadomość to oszustwo?
        </p>
        <SmsChatView
          ref={chatRef}
          onRoundResult={setRoundResult}
          resultModalOpen={roundResult !== null}
          onDismissRoundResult={() => setRoundResult(null)}
        />
      </div>

      {roundResult ? (
        <ResultModal
          open
          onClose={() => setRoundResult(null)}
          success={roundResult.correct}
          subtitle={
            roundResult.correct
              ? 'Trafnie oceniłeś wiadomość.'
              : 'To nie była właściwa klasyfikacja — zobacz wyjaśnienie poniżej.'
          }
          explanation={roundResult.explanation}
          nextAction={{
            label: 'Kolejna wiadomość',
            onClick: () => {
              setRoundResult(null)
              void chatRef.current?.loadNextScenario()
            },
          }}
        />
      ) : null}
    </div>
  )
}
