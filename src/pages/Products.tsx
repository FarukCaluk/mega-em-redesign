import { FileText } from 'lucide-react'
import { catalogs, partners, swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import TiltCard from '../components/TiltCard'
import ProductCatalog from '../components/ProductCatalog'

export default function Products() {
  return (
    <>
      <PageIntro eyebrow="Proizvodi" title="Kompletan asortiman za vaše potrebe" description="Pretražite katalog po nazivu, brendu, šifri ili kategoriji proizvoda." />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <ProductCatalog />
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
