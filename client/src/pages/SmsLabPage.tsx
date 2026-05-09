import { Link } from 'react-router-dom'
import { SmsChatView } from '../features/sms/components/SmsChatView'

export default function SmsLabPage() {
  return (
    <div className="min-h-dvh bg-black text-zinc-100 antialiased">
      <div className="mx-auto max-w-lg px-4 pb-12 pt-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
              SMS Lab
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Edukacja: czy ta wiadomość to oszustwo?
            </p>
          </div>
          <Link
            to="/"
            className="shrink-0 rounded-lg px-3 py-2 text-sm text-teal-400 ring-1 ring-teal-500/30 hover:bg-teal-500/10"
          >
            Start
          </Link>
        </div>
        <SmsChatView />
      </div>
    </div>
  )
}
