export type TextChunk =
  | { type: 'text'; value: string }
  | { type: 'tip'; value: string; lesson: string }

export type MailBodyParagraph = {
  chunks: TextChunk[]
}

export type MailActionLink = {
  label: string
  /** Tekst przy przycisku (np. „wygląda jak” paypal) */
  apparentLabel: string
  /** Rzeczywisty URL pokazywany po najechaniu */
  href: string
  hoverLesson: string
}

export type SimulatedEmail = {
  id: string
  fromName: string
  fromAddress: string
  subject: string
  timeLabel: string
  paragraphs: MailBodyParagraph[]
  actions?: MailActionLink[]
  /** Prawda = próba phishingu — poprawny wybór to „spam” */
  isPhishing: boolean
  /** Krótki komentarz edukacyjny po decyzji, gdy to nie phishing */
  legitInsight?: string
}

export type UserDecision = 'approve' | 'spam'
