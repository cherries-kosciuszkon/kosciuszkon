export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 py-3 w-fit ml-2 mb-4">
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.3s]"></span>
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.15s]"></span>
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce"></span>
    </div>
  )
}