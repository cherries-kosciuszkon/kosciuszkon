import { useMemo } from 'react'
import { LISTED_PRODUCTS, SELLER_NAMES } from '../data/sellerOptions'
import { PROMPT_SCENARIOS } from '../data/promptScenarios'
import type { ChatSessionPrompt } from '../types/prompt'

function pickRandom<T>(items: readonly T[]): T {
  const i = Math.floor(Math.random() * items.length)
  return items[i] as T
}

// Generates random prompt
export function useRandomPrompt(): ChatSessionPrompt {
  return useMemo(() => {
    const { isScammer, scenario } = pickRandom(PROMPT_SCENARIOS)
    const { imageName, ...listedProduct } = pickRandom(LISTED_PRODUCTS)
    return {
      isScammer,
      scenario,
      sellerName: pickRandom(SELLER_NAMES),
      listedProduct,
      imageName,
    }
  }, [])
}
