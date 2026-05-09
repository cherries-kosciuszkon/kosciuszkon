import { useRef, useState, type FormEvent } from 'react'

type MessageComposerProps = {
  onSend: (body: string) => void
}

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    onSend(t)
    setText('')
    queueMicrotask(() => inputRef.current?.focus())
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur-sm sm:p-4"
    >
      <label htmlFor="chat-input" className="sr-only">
        Wiadomość
      </label>
      <div className="flex gap-2 sm:gap-3">
        <input
          ref={inputRef}
          id="chat-input"
          type="text"
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Np. nie rozumiem zadania z lekcji…"
          className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/25"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="shrink-0 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-black/30 transition hover:from-teal-400 hover:to-emerald-500 focus-visible:outline focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-35"
        >
          Wyślij
        </button>
      </div>
    </form>
  )
}
