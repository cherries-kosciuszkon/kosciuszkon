type InspectLinkButtonProps = {
  label: string
  apparentHost: string
  href: string
  hoverLesson?: string
  /** Gdy false — wygląda jak normalny przycisk, bez podpowiedzi o URL */
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
      <span className="text-xs text-zinc-500">Przycisk w treści</span>
      <button
        type="button"
        disabled
        className="rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white opacity-95 shadow-lg shadow-black/30 ring-1 ring-white/10"
      >
        {label}
      </button>
      <p className="text-[11px] text-zinc-500">
        Podpis przy linku (może być fałszywy):{' '}
        <span className="font-mono text-zinc-400">{apparentHost}</span>
      </p>
      {inspectionsUnlocked ? (
        <div className="absolute left-0 top-full z-20 mt-1 w-[min(22rem,calc(100vw-3rem))] rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-xs leading-snug text-zinc-100 opacity-0 shadow-xl shadow-black/50 ring-1 ring-teal-500/20 transition-opacity duration-150 group-hover:opacity-100 sm:w-auto sm:max-w-md">
          <span className="block font-mono text-[11px] text-teal-300">{href}</span>
          {hoverLesson ? (
            <span className="mt-2 block border-t border-zinc-700 pt-2 text-zinc-300">
              {hoverLesson}
            </span>
          ) : null}
        </div>
      ) : (
        <p className="mt-1 max-w-xs text-[11px] text-zinc-500">
          Po decyzji najedź kursorem na przycisk — zobaczysz dokąd prowadziłby link.
        </p>
      )}
    </div>
  )
}
