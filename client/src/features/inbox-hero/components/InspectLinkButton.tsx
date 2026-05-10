type InspectLinkButtonProps = {
  label: string
  apparentHost: string
  href: string
  hoverLesson?: string
  inspectionsUnlocked: boolean
}

export function InspectLinkButton({
  label,
  apparentHost,
  href,
  hoverLesson,
  inspectionsUnlocked,
}: InspectLinkButtonProps) {
  return (
    <div className="group relative mt-4 inline-flex flex-col items-start gap-1">
      <span className="text-xs text-zinc-500"></span>
      
      <button
        type="button"
        aria-disabled="true"
        className="rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/30 ring-1 ring-white/10 transition-all duration-200 opacity-95 group-hover:opacity-100 group-hover:brightness-110 group-hover:shadow-teal-500/20"
      >
        {label}
      </button>

      <p className="text-[11px] text-zinc-500">
        Podpis przy linku:{' '}
        <span className="font-mono text-zinc-400">{apparentHost}</span>
      </p>

      {inspectionsUnlocked ? (
        <div className="absolute left-0 top-full z-20 mt-1 w-[min(22rem,calc(100vw-3rem))] pointer-events-none rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-xs leading-snug text-zinc-100 opacity-0 shadow-xl shadow-black/50 ring-1 ring-teal-500/20 transition-opacity duration-200 group-hover:opacity-100 sm:w-auto sm:max-w-md">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Rzeczywisty cel linku:</span>
            <span className="block font-mono text-[11px] text-teal-300 break-all">{href}</span>
          </div>
          {hoverLesson ? (
            <span className="mt-2 block border-t border-zinc-700 pt-2 text-zinc-300 italic">
              {hoverLesson}
            </span>
          ) : null}
        </div>
      ) : (
        <p className="mt-1 max-w-xs text-[11px] leading-tight text-zinc-500 italic">
          Po decyzji najedz kursorem na przycisk — zobaczysz dokad prowadzilby link.
        </p>
      )}
    </div>
  )
}