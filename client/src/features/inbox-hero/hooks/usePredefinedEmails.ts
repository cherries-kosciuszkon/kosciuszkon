import { useCallback, useEffect, useState } from 'react'
import { INBOX_HERO_EMAILS } from '../data/mockEmails'
import type { SimulatedEmail } from '../types'

export type InboxEmailsLoadStatus = 'idle' | 'loading' | 'ready' | 'error'

type State = {
  emails: SimulatedEmail[]
  status: InboxEmailsLoadStatus
  errorMessage: string | null
}

function getRandomEmails(count: number): SimulatedEmail[] {
  const shuffled = [...INBOX_HERO_EMAILS].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function useEmails() {
  const [state, setState] = useState<State>({
    emails: [],
    status: 'idle',
    errorMessage: null,
  })

  const refetchInboxEmails = useCallback(() => {
    setState({
      emails: [],
      status: 'loading',
      errorMessage: null,
    })

    setTimeout(() => {
      const randomSet = getRandomEmails(4)
      setState({
        emails: randomSet,
        status: 'ready',
        errorMessage: null,
      })
    }, 400)
  }, [])

  useEffect(() => {
    refetchInboxEmails()
  }, [refetchInboxEmails])

  return {
    emails: state.emails,
    status: state.status,
    errorMessage: state.errorMessage,
    refetchInboxEmails,
  }
}