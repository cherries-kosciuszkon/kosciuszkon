type TooltipHighlightProps = {
  children: string
  tooltip: string
}

/**
 * Fragment z podświetleniem i tooltipem (po ujawnieniu lekcji — patrz stan w rodzicu).
 */
export function TooltipHighlight({ children, tooltip }: TooltipHighlightProps) {
  return (
    <span className="group relative inline-block border-b-2 border-dotted border-amber-400/80 text-amber-200">
      <span className="font-medium">{children}</span>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-xs leading-snug text-zinc-100 opacity-0 shadow-xl shadow-black/50 ring-1 ring-teal-500/20 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 sm:w-80"
      >
        {tooltip}
      </span>
    </span>
  )
}
