import { Link } from 'react-router-dom'

const LOGO_SRC = '/logo_white.png'

function CyberBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -left-1/4 top-1/4 h-[28rem] w-[28rem] rounded-full bg-teal-500/15 blur-[100px] motion-safe:animate-pulse" />
      <div className="absolute -right-1/4 bottom-0 h-[24rem] w-[24rem] rounded-full bg-emerald-600/10 blur-[90px]" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <pre className="absolute -left-4 top-8 max-w-none select-none font-mono text-[11px] leading-relaxed text-teal-400/25 sm:text-xs">
        {`0x7f3a9c2e  TLS1.3  VERIFY_OK
sha256$…b4e1  cert_chain valid
WARN: social_engineering.detect()
→ trust_boundary: user_input
if (sender.claims_urgency) flag++;
// phishing heuristics — idle`}
      </pre>
      <pre className="absolute -right-8 bottom-24 hidden max-w-none select-none font-mono text-[11px] leading-relaxed text-emerald-400/20 sm:block sm:text-xs">
        {`$ scan --module av
[OK] sandbox
[OK] link_rewrite
[!!] reputation: unknown
nonce: 9f2c…e41b
session.hardening=ON`}
      </pre>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </div>
  )
}


export default function HomePage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-black text-zinc-100 antialiased">
      <CyberBackdrop />
      <main className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
        <img
          src={LOGO_SRC}
          alt="Kościuszkon"
          className="h-[4.5rem] w-auto max-w-[min(315px,92vw)] object-contain sm:h-24 sm:max-w-[min(360px,92vw)] mb-9 sm:mb-12"
          decoding="async"
        />
        <p className="text-balance text-lg leading-snug text-zinc-300 sm:text-xl">
          Jesteś pewien, że wykryjesz oszustwo?
        </p>
        <p className="mt-3 max-w-sm text-pretty text-sm text-zinc-500">
          Symulacja rozmowy z oszustem — sprawdź refleks i czujność w bezpiecznym
          środowisku.
        </p>
        <div className="mt-10 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/chat"
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-950/40 ring-1 ring-white/10 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 active:brightness-95"
          >
            Rozpocznij rozmowę
          </Link>
          <Link
            to="/sms-lab"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-zinc-600 bg-zinc-900/80 px-8 py-3.5 text-base font-semibold text-zinc-100 shadow-lg shadow-black/30 ring-1 ring-white/5 transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 active:brightness-95"
          >
            SMS Lab
          </Link>
        </div>
      </main>
    </div>
  )
}
