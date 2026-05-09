import type { SimulatedEmail, UserDecision } from './types'

export function collectPhishingLessons(email: SimulatedEmail): string[] {
  const list: string[] = []
  for (const p of email.paragraphs) {
    for (const c of p.chunks) {
      if (c.type === 'tip') list.push(c.lesson)
    }
  }
  for (const a of email.actions ?? []) list.push(a.hoverLesson)
  return list
}

export function isDecisionCorrect(email: SimulatedEmail, decision: UserDecision): boolean {
  if (email.isPhishing) return decision === 'spam'
  return decision === 'approve'
}
