import { MiniGameNavbar } from '../features/common/MiniGameNavbar'
import { InboxHeroPanel } from '../features/inbox-hero/components/InboxHeroPanel'

export default function InboxHeroPage() {
  return (
    <div className="min-h-dvh bg-black text-zinc-100 antialiased">
      <MiniGameNavbar />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <InboxHeroPanel />
      </div>
    </div>
  )
}
