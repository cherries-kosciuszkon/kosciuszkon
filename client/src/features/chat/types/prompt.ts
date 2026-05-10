export type PromptScenario = {
  isScammer: boolean
  scenario: string
}

export type ListedProduct = {
  item: string
  price: string
}

export type ChatSessionPrompt = PromptScenario & {
  sellerName: string
  listedProduct: ListedProduct
  imageName: string
}
