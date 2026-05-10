export type PromptScenario = {
  isScammer: boolean
  scenario: string
}

export type ListedProduct = {
  item: string
  price: string
}

export type ChatSessionPrompt = PromptScenario & {
  /** Unikalny identyfikator rundy — zmiana zeruje wątek w panelu czatu. */
  sessionId: string
  sellerName: string
  listedProduct: ListedProduct
  imageName: string
}
