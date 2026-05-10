import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { MailBodyParagraph, SimulatedEmail, TextChunk, UserDecision } from '../types'
import { useEmails } from '../hooks/usePredefinedEmails'
import { collectPhishingLessons, isDecisionCorrect } from '../lessonUtils'
import { InspectLinkButton } from './InspectLinkButton'
import { TooltipHighlight } from './TooltipHighlight'

function renderChunks(chunks: TextChunk[], lessonsRevealed: boolean): ReactNode {
  const hasTipInParagraph = chunks.some(c => c.type === 'tip');

  return chunks.map((chunk, index) => {
    if (chunk.type === 'text') {
      if (hasTipInParagraph && !lessonsRevealed) {
        return null;
      }
      return <span key={index}>{chunk.value}</span>;
    }

    if (!lessonsRevealed) {
      return null;
    }

    return (
      <TooltipHighlight key={index} tooltip={chunk.lesson}>
        {chunk.value}
      </TooltipHighlight>
    );
  });
}

function BodyContent({
  paragraphs,
  lessonsRevealed,
}: {
  paragraphs: MailBodyParagraph[]
  lessonsRevealed: boolean
}) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-zinc-300">
      {paragraphs.map((p, pi) => {
        const hasTip = p.chunks.some(c => c.type === 'tip');
        
        if (hasTip && !lessonsRevealed) return null;

        return (
          <p key={pi} className={hasTip ? "mt-4 border-t border-zinc-800/50 pt-4 italic text-zinc-400" : ""}>
            {renderChunks(p.chunks, lessonsRevealed)}
          </p>
        );
      })}
    </div>
  )
}

type EmailRowProps = {
  email: SimulatedEmail
  selected: boolean
  decision?: UserDecision
  onSelect: () => void
}

function EmailRow({ email, selected, decision, onSelect }: EmailRowProps) {
  const decided = Boolean(decision)
  const ok = decision ? isDecisionCorrect(email, decision) : null

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-3 border-l-4 px-3 py-3 text-left transition sm:px-4 ${
        selected
          ? 'border-teal-500 bg-zinc-800/70'
          : 'border-transparent bg-transparent hover:bg-zinc-900/90'
      }`}
    >
      <span className="mt-1 shrink-0 text-xs tabular-nums text-zinc-500">{email.timeLabel}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-zinc-100">{email.fromName}</span>
          {!decided ? (
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400 shadow-[0_0_10px_theme(colors.teal.400)]"
            />
          ) : ok ? (
            <span className="text-xs font-medium text-emerald-400">OK</span>
          ) : (
            <span className="text-xs font-medium text-amber-400">sprawdź</span>
          )}
        </div>
        <div className="truncate text-xs text-zinc-500">{email.fromAddress}</div>
        <div className="mt-1 truncate text-sm text-zinc-300">{email.subject}</div>
      </div>
    </button>
  )
}

export function InboxHeroPanel() {
  const { emails, status, errorMessage, refetchInboxEmails } = useEmails()

  const [selectedId, setSelectedId] = useState('')
  const [decisions, setDecisions] = useState<Partial<Record<string, UserDecision>>>({})

  useEffect(() => {
    if (emails.length > 0) {
      setSelectedId(emails[0].id)
      setDecisions({})
    }
  }, [emails])

  const selected = useMemo(
    () => emails.find((e) => e.id === selectedId) ?? emails[0],
    [emails, selectedId],
  )

  if (status === 'loading' && emails.length === 0) {
    return (
      <section className="flex h-96 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-400">
        Losowanie wiadomości...
      </section>
    )
  }

  if (!selected || emails.length === 0) {
    return null
  }

  const decisionForSelected = decisions[selected.id]
  const lessonsRevealed = Boolean(decisionForSelected)
  const correct = decisionForSelected ? isDecisionCorrect(selected, decisionForSelected) : null
  const lessons = lessonsRevealed ? collectPhishingLessons(selected) : []
  const decidedCount = Object.keys(decisions).length

  function submitDecision(decision: UserDecision) {
    setDecisions((prev) => ({ ...prev, [selected.id]: decision }))
  }

  return (
    <section className="flex min-h-[min(32rem,calc(100dvh-13rem))] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50 ring-1 ring-white/[0.06] sm:flex-1 sm:min-h-[min(38rem,calc(100dvh-12rem))]">
      <header className="shrink-0 border-b border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-xs font-bold text-white shadow-lg">
              IH
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-50 sm:text-lg">Inbox Hero</h2>
              <p className="text-xs text-zinc-400 sm:text-sm">
                Phishing Simulator — losowy zestaw 4 zadań z bazy lokalnej.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-1.5 text-xs text-zinc-400">
            Zdecydowano: <span className="font-semibold text-zinc-200">{decidedCount}/{emails.length}</span>
          </div>
        </div>
      </header>

      {status === 'error' && errorMessage && (
        <div className="border-b border-zinc-800 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
          {errorMessage}
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="border-b border-zinc-800 lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r lg:overflow-y-auto">
          <nav className="flex max-h-[14rem] flex-col overflow-y-auto divide-y divide-zinc-800/80 lg:max-h-none">
            {emails.map((e) => (
              <EmailRow
                key={e.id}
                email={e}
                selected={e.id === selected.id}
                decision={decisions[e.id]}
                onSelect={() => setSelectedId(e.id)}
              />
            ))}
            <button 
              onClick={refetchInboxEmails}
              className="p-3 text-xs text-teal-400 hover:bg-zinc-900 transition text-center font-medium"
            >
              Wylosuj inne maile
            </button>
          </nav>
        </aside>

        <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-zinc-950 to-black">
          <article className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
            <div className="border-b border-zinc-800/80 pb-4">
              <h3 className="text-lg font-semibold text-zinc-50">{selected.subject}</h3>
              <div className="mt-3 flex items-baseline gap-x-4 text-sm">
                <span className="font-medium text-zinc-300">
                  Od: <span className="text-teal-300">{selected.fromName}</span>
                </span>
                <span className="text-zinc-500">{selected.timeLabel}</span>
              </div>
            </div>

            <div className="mt-6 min-h-0 flex-1">
              <BodyContent paragraphs={selected.paragraphs} lessonsRevealed={lessonsRevealed} />
              {selected.actions?.map((a) => (
                <InspectLinkButton
                  key={a.href + a.label}
                  label={a.label}
                  apparentHost={a.apparentLabel}
                  href={a.href}
                  hoverLesson={a.hoverLesson}
                  inspectionsUnlocked={lessonsRevealed}
                />
              ))}
            </div>

            <div className="mt-8 border-t border-zinc-800 pt-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={lessonsRevealed}
                  onClick={() => submitDecision('approve')}
                  className="rounded-xl border border-zinc-600 bg-zinc-800/90 px-4 py-2.5 text-sm font-medium text-zinc-100 transition hover:bg-zinc-700 disabled:opacity-40"
                >
                  Zatwierdź
                </button>
                <button
                  type="button"
                  disabled={lessonsRevealed}
                  onClick={() => submitDecision('spam')}
                  className="rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg disabled:opacity-40"
                >
                  Zgłoś jako spam
                </button>
              </div>

              {lessonsRevealed && (
                <div className={`mt-6 rounded-xl border px-4 py-4 ${correct ? 'border-emerald-800/70 bg-emerald-950/30' : 'border-amber-800/60 bg-amber-950/25'}`}>
                  <p className={`text-sm font-semibold ${correct ? 'text-emerald-300' : 'text-amber-200'}`}>
                    {correct ? (
                      "Dobrze!"
                    ) : selected.isPhishing ? (
                      "To bylo oszustwo."
                    ) : (
                      "To była bezpieczna wiadomość — niepotrzebnie ją zgłosiłeś."
                    )}
                  </p>

                  {selected.isPhishing && lessons.length > 0 && (
                    <ul className="mt-3 list-disc pl-5 text-sm text-zinc-300 space-y-1">
                      {lessons.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  )}

                  {!selected.isPhishing && !correct && (
                    <p className="mt-2 text-sm text-zinc-400">
                      Ta wiadomość nie zawierała elememtów manipulacji ani podejrzanych linków.
                    </p>
                  )}
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}