import { useMemo } from 'react'
import { PROMPT_SCENARIOS } from '../data/promptScenarios'
import type { ChatSessionPrompt } from '../types/prompt'

function pickRandom<T>(items: readonly T[]): T {
  const i = Math.floor(Math.random() * items.length)
  return items[i] as T
}


export function useRandomPrompt(): ChatSessionPrompt {
  return useMemo(() => pickRandom(PROMPT_SCENARIOS), [])
}
