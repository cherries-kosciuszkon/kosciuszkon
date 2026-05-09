import type {
  MailActionLink,
  MailBodyParagraph,
  SimulatedEmail,
  TextChunk,
} from '../types'

const EXPECTED_INBOX_BATCH_SIZE = 4

/** Parsuje blok JSON od pierwszego znaku „{” do ostatniego „}” lub tablicę od „[”. */
export function extractJsonFromModelAnswer(text: string): unknown {
  const trimmed = text.trim()
  const fence = /^```(?:json)?\s*([\s\S]*?)```/i.exec(trimmed)
  const raw = (fence?.[1] ?? trimmed).trim()

  const objStart = raw.indexOf('{')
  const arrStart = raw.indexOf('[')

  if (objStart !== -1 && (arrStart === -1 || objStart < arrStart)) {
    const end = raw.lastIndexOf('}')
    if (end <= objStart) {
      throw new Error('Brak obiektu JSON w odpowiedzi modelu')
    }
    return JSON.parse(raw.slice(objStart, end + 1))
  }

  if (arrStart !== -1) {
    const end = raw.lastIndexOf(']')
    if (end <= arrStart) {
      throw new Error('Brak tablicy JSON w odpowiedzi modelu')
    }
    return JSON.parse(raw.slice(arrStart, end + 1))
  }

  throw new Error('Brak JSON w odpowiedzi modelu')
}

/** Jedna odpowiedź czatu → 4 maile ({ emails } lub sama tablica 4-elementowa). */
export function parseEmailsBatchFromModelAnswer(answerText: string): SimulatedEmail[] {
  const parsed = extractJsonFromModelAnswer(answerText)

  let list: unknown[]
  if (Array.isArray(parsed)) {
    list = parsed
  } else if (isRecord(parsed) && Array.isArray(parsed.emails)) {
    list = parsed.emails
  } else {
    throw new Error('Oczekiwano { emails: [...] } lub tablicy maili')
  }

  if (list.length !== EXPECTED_INBOX_BATCH_SIZE) {
    throw new Error(`Oczekiwano ${EXPECTED_INBOX_BATCH_SIZE} wiadomości, otrzymano ${list.length}`)
  }

  return list.map((item, index) => parseSimulatedEmailFromJson(item, index))
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return Boolean(v && typeof v === 'object' && !Array.isArray(v))
}

function coerceChunk(raw: unknown): TextChunk | null {
  if (!isRecord(raw)) return null
  const type = raw.type
  const value = raw.value

  if (type === 'text' && typeof value === 'string' && value.length > 0) {
    return { type: 'text', value }
  }

  if (type === 'tip' && typeof value === 'string' && typeof raw.lesson === 'string') {
    if (!value.trim() || !raw.lesson.trim()) return null
    return { type: 'tip', value, lesson: raw.lesson }
  }

  return null
}

function coerceParagraph(raw: unknown): MailBodyParagraph | null {
  if (!isRecord(raw)) return null
  const chunksRaw = raw.chunks
  if (!Array.isArray(chunksRaw)) return null

  const chunks: TextChunk[] = []
  for (const c of chunksRaw) {
    const ch = coerceChunk(c)
    if (ch) chunks.push(ch)
  }

  return chunks.length > 0 ? { chunks } : null
}

function coerceAction(raw: unknown): MailActionLink | null {
  if (!isRecord(raw)) return null
  const label = raw.label
  const apparentLabel = raw.apparentLabel
  const href = raw.href
  const hoverLesson = raw.hoverLesson

  if (
    typeof label === 'string' &&
    typeof apparentLabel === 'string' &&
    typeof href === 'string' &&
    typeof hoverLesson === 'string'
  ) {
    if (
      !label.trim() ||
      !apparentLabel.trim() ||
      !href.trim() ||
      !hoverLesson.trim()
    ) {
      return null
    }
    return { label, apparentLabel, href, hoverLesson }
  }

  return null
}

/** Mapuje pojedynczy obiekt z modelu na SimulatedEmail. */
export function parseSimulatedEmailFromJson(data: unknown, slotIndex: number): SimulatedEmail {
  if (!isRecord(data)) {
    throw new Error('Wiadomość nie jest obiektem JSON')
  }

  const strings = ['fromName', 'fromAddress', 'subject'] as const
  for (const k of strings) {
    const v = data[k]
    if (typeof v !== 'string' || !v.trim()) throw new Error(`Brak lub puste pole "${k}"`)
  }

  const timeRaw = data.timeLabel
  if (typeof timeRaw !== 'string' || !/^\d{1,2}:\d{2}$/.test(timeRaw.trim())) {
    throw new Error('timeLabel ma być HH:MM')
  }

  if (typeof data.isPhishing !== 'boolean') {
    throw new Error('Brak pola isPhishing (boolean)')
  }

  const paragraphsRaw = data.paragraphs
  if (!Array.isArray(paragraphsRaw)) {
    throw new Error('paragraphs ma być tablicą')
  }

  const paragraphs: MailBodyParagraph[] = []
  for (const pr of paragraphsRaw) {
    const p = coerceParagraph(pr)
    if (p) paragraphs.push(p)
  }

  if (paragraphs.length === 0) {
    throw new Error('paragraphs nie może być pusty')
  }

  let actions: MailActionLink[] | undefined
  if (data.actions !== undefined && data.actions !== null) {
    if (!Array.isArray(data.actions)) {
      throw new Error('actions musi być tablicą lub null')
    }
    const mapped = data.actions.map(coerceAction).filter(Boolean) as MailActionLink[]
    actions = mapped.length ? mapped : undefined
  }

  const legitInsight =
    typeof data.legitInsight === 'string' && data.legitInsight.trim().length > 0
      ? data.legitInsight.trim()
      : undefined

  const id =
    typeof data.id === 'string' && data.id.trim()
      ? data.id.trim()
      : `gen-${slotIndex}-${crypto.randomUUID().slice(0, 8)}`

  return {
    id,
    fromName: (data.fromName as string).trim(),
    fromAddress: (data.fromAddress as string).trim(),
    subject: (data.subject as string).trim(),
    timeLabel: timeRaw.trim(),
    paragraphs,
    actions,
    isPhishing: data.isPhishing,
    legitInsight,
  }
}
