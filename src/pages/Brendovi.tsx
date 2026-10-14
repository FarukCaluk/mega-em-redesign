import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { brands } from '../data/brands'
import { swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import TiltCard from '../components/TiltCard'

export default function Brendovi() {
  return (
    <>
      <PageIntro eyebrow="Brendovi" title="Brendovi" description="Brendovi koje zastupamo" />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b, i) => {
            const color = swatches[i % swatches.length]
            return (
              <Reveal key={b.name} delay={(i % 3) * 70} className="h-full">
                <Link to={`/proizvodi?brend=${encodeURIComponent(b.name)}`} className="block h-full">
                  <TiltCard glow={color} className="!border-primary/10 !bg-gradient-to-br !from-primary/[0.06] !to-primary-light/[0.02]">
                    <div className="flex h-full flex-col items-center p-5 text-center">
                      <div className="flex h-36 w-full items-center justify-center rounded-xl bg-white p-4 ring-1 ring-black/5">
                        {b.logo ? (
                          <img loading="lazy" decoding="async" src={b.logo} alt={b.name} className="max-h-28 w-auto max-w-full object-contain" />
                        ) : (
                          <span className="flex h-20 w-20 items-center justify-center rounded-2xl text-xl font-bold text-white" style={{ background: color }}>
                            {b.name.slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover/tilt:text-[var(--glow)]">{b.name}</h3>
                      <p className="mt-2 line-clamp-6 flex-1 text-sm text-muted">{b.intro ?? 'Brend iz Mega-Em asortimana. Opis brenda uskoro.'}</p>
                      <span className="mt-4 flex items-center gap-1.5 text-sm font-medium" style={{ color }}>
                        Pogledaj proizvode <ArrowRight size={14} />
                      </span>
                    </div>
                  </TiltCard>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
