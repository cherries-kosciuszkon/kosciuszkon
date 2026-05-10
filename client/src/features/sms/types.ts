export type SmsScenario = {
  id: string
  sender: string
  content: string
  isScam: boolean
  explanation: string
}

export type SmsRoundResult = {
  userChoseScam: boolean
  correct: boolean
  explanation: string
}
