import { useEffect } from 'react'
import FlowLines from './FlowLines'

type Props = { eyebrow: string; title: string; description?: string; metaDescription?: string }

export default function PageIntro({ eyebrow, title, description, metaDescription = description }: Props) {
  // svaka stranica ima svoj naslov i opis za Google; pri izlasku se vraćaju zadani iz index.html
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')!
    const before = { title: document.title, description: meta.content }
    document.title = /mega-em/i.test(title) ? title : `${title} — Mega-Em`
    if (metaDescription) meta.content = metaDescription.replace(/\s+/g, ' ').slice(0, 160)
    return () => {
      document.title = before.title
      meta.content = before.description
    }
  }, [title, metaDescription])

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
