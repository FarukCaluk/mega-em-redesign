import type { ReactNode } from 'react'
import FlowLines from './FlowLines'

export default function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description?: string }) {
  return (
    <section className="grain relative overflow-hidden bg-ink pb-14 pt-24 text-white sm:pb-16 sm:pt-28">
      <div className="pointer-events-none absolute -left-32 -top-24 h-72 w-72 bg-[radial-gradient(closest-side,rgb(130_9_155/0.3),transparent)] sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 bg-[radial-gradient(closest-side,rgb(161_60_176/0.2),transparent)] sm:h-80 sm:w-80" />
      <FlowLines />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-light" /> {eyebrow}
        </span>

        <h1 style={{ animationDelay: '100ms' }} className="animate-fade-up mt-5 text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>

        {description && (
          <p style={{ animationDelay: '200ms' }} className="animate-fade-up mt-4 text-white/60">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
