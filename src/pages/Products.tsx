import { FileText } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { catalogs, swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import TiltCard from '../components/TiltCard'
import ProductCatalog from '../components/ProductCatalog'

export default function Products() {
  const { search } = useLocation()
  return (
    <>
      <PageIntro eyebrow="Katalog proizvoda" title="Katalog proizvoda" description="Pretražite katalog po nazivu, brendu, šifri ili kategoriji proizvoda." />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <ProductCatalog key={search} />
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
    </>
  )
}
