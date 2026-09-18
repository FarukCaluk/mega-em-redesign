import { FileText, ExternalLink } from 'lucide-react'
import { productCategories, catalogs, partners, swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import TiltCard from '../components/TiltCard'

export default function Products() {
  return (
    <>
      <PageIntro eyebrow="Proizvodi" title="Kompletan asortiman za vaše potrebe" />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((c, i) => {
            const color = swatches[i % swatches.length]
            return (
              <Reveal key={c.title} delay={(i % 3) * 80} variant={i % 2 ? 'right' : 'left'} className="h-full">
                <TiltCard glow={color}>
                  <div className="p-7">
                    <span
                      className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-semibold text-white transition-transform duration-300 group-hover/tilt:scale-110"
                      style={{ background: color }}
                    >
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover/tilt:text-[var(--glow)]">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted">{c.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="grain bg-deep py-16 text-white">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-2xl font-semibold">Mega-Em web shop</h2>
            <p className="mt-2 text-white/60">Posjetite naš web shop i kupite naše proizvode online.</p>
          </div>
          <a href="https://www.m-shop.ba/" target="_blank" rel="noreferrer" className="flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25">
            Web shop <ExternalLink size={16} />
          </a>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal><h2 className="mb-8 font-display text-2xl font-semibold text-ink">Katalozi</h2></Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {catalogs.map((c, i) => {
            const color = swatches[(i + 2) % swatches.length]
            return (
              <Reveal key={c.title} delay={i * 80}>
                <TiltCard glow={color}>
                  <a href={c.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-6">
                    <FileText className="shrink-0 transition-colors duration-300 group-hover/tilt:text-[var(--glow)]" style={{ color }} size={28} />
                    <div>
                      <h3 className="font-display font-semibold text-ink">{c.title}</h3>
                      <p className="text-sm text-muted">Preuzmi PDF katalog</p>
                    </div>
                  </a>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><h2 className="mb-8 text-center font-display text-2xl font-semibold text-ink">Zastupamo svjetske brendove</h2></Reveal>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6">
            {partners.map((p, i) => (
              <Reveal key={p.id} delay={(i % 6) * 50} className="flex items-center justify-center rounded-xl bg-white p-4 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md">
                <img src={p.logo} alt={p.id} className="h-8 w-auto object-contain" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
