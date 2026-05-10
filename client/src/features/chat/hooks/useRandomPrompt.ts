import { useMemo } from 'react'
import { LISTED_PRODUCTS, SELLER_NAMES } from '../data/sellerOptions'
import { PROMPT_SCENARIOS } from '../data/promptScenarios'
import type { ChatSessionPrompt } from '../types/prompt'

function pickRandom<T>(items: readonly T[]): T {
  const i = Math.floor(Math.random() * items.length)
  return items[i] as T
}

export function createRandomChatPrompt(): ChatSessionPrompt {
  const { isScammer, scenario } = pickRandom(PROMPT_SCENARIOS)
  const { imageName, ...listedProduct } = pickRandom(LISTED_PRODUCTS)
  return {
    sessionId: crypto.randomUUID(),
    isScammer,
    scenario,
    sellerName: pickRandom(SELLER_NAMES),
    listedProduct,
    imageName,
  }
}

/** Losuje prompt na montowanie komponentu (jedna runda). Do kolejnych rund użyj `createRandomChatPrompt`. */
export function useRandomPrompt(): ChatSessionPrompt {
  return useMemo(() => createRandomChatPrompt(), [])
}
