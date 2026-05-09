import { ChatPanel } from '../features/chat/components/ChatPanel'

export default function ChatPage() {
  return (
    <div className="min-h-dvh bg-black text-zinc-100 antialiased">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <ChatPanel className="min-h-[20rem] h-[min(32rem,calc(100dvh-13rem))] sm:h-[min(36rem,calc(100dvh-12rem))]" />
      </div>
    </div>
  )
}
