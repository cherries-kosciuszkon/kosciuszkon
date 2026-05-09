import { useCallback, useEffect, useState } from 'react'
import { postChatPrompt } from '../../../api/postChatPrompt'
import { INBOX_BATCH_GENERATION_PROMPT } from '../prompts/inboxBatchPrompt'
import { INBOX_HERO_EMAILS } from '../data/mockEmails'
import { parseEmailsBatchFromModelAnswer } from '../services/parseModelEmailJSON'
import type { SimulatedEmail } from '../types'

export type InboxEmailsLoadStatus = 'idle' | 'loading' | 'ready' | 'error'

type State = {
  emails: SimulatedEmail[]
  status: InboxEmailsLoadStatus
  errorMessage: string | null
}

async function fetchInboxEmailsOneRequest(): Promise<SimulatedEmail[]> {
  const answerText = await postChatPrompt(INBOX_BATCH_GENERATION_PROMPT)
  return parseEmailsBatchFromModelAnswer(answerText)
}

export function useInboxEmailsFromApi() {
  const [state, setState] = useState<State>({
    emails: [],
    status: 'idle',
    errorMessage: null,
  })

  const refetchInboxEmails = useCallback(async () => {
    setState({
      emails: [],
      status: 'loading',
      errorMessage: null,
    })

    try {
      const answers = await fetchInboxEmailsOneRequest()
      setState({
        emails: answers,
        status: 'ready',
        errorMessage: null,
      })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Nie udało się wygenerować wiadomości'
      console.error(e)
      setState({
        emails: [...INBOX_HERO_EMAILS],
        status: 'error',
        errorMessage: `${msg}. Wczytano przykładowy zestaw (offline/demo).`,
      })
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    void (async () => {
      setState(() => ({
        emails: [],
        status: 'loading',
        errorMessage: null,
      }))

      try {
        const answers = await fetchInboxEmailsOneRequest()
        if (cancelled) return
        setState({
          emails: answers,
          status: 'ready',
          errorMessage: null,
        })
      } catch (e) {
        if (cancelled) return
        const msg = e instanceof Error ? e.message : 'Nie udało się wygenerować wiadomości'
        console.error(e)
        setState({
          emails: [...INBOX_HERO_EMAILS],
          status: 'error',
          errorMessage: `${msg}. Wczytano przykładowy zestaw (offline/demo).`,
        })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return {
    emails: state.emails,
    status: state.status,
    errorMessage: state.errorMessage,
    refetchInboxEmails,
  }
}
