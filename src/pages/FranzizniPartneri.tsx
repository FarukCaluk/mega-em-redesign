import { Phone, Mail, MapPin, Clock, Store } from 'lucide-react'
import { franchises } from '../data/franchises'
import { swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import TiltCard from '../components/TiltCard'

export default function FranzizniPartneri() {
  return (
    <>
      <PageIntro eyebrow="Franšizni partneri" title="Pronađite nas u vašem gradu" description="Mega-Em franšizni partneri širom Bosne i Hercegovine." />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {franchises.map((f, i) => {
            const color = swatches[i % swatches.length]
            return (
              <Reveal key={f.slug} id={f.slug} delay={(i % 3) * 80} className="h-full scroll-mt-24">
                <TiltCard glow={color} className="overflow-hidden !border-primary/10">
                  <div className="flex aspect-[16/9] items-center justify-center" style={{ background: `${color}14` }}>
                    {f.image ? (
                      <img loading="lazy" decoding="async" src={f.image} alt={f.name} className="h-full w-full object-cover" />
                    ) : (
                      <Store size={36} style={{ color }} />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-ink transition-colors duration-300 group-hover/tilt:text-[var(--glow)]">{f.name}</h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-muted">
                      <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0" /> <span><b className="font-medium text-ink">{f.city}</b>{f.address && <>, {f.address}</>}</span></li>
                      {f.phone && <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0" /><a href={`tel:${f.phone.replace(/\D/g, '')}`} className="hover:underline">{f.phone}</a></li>}
                      {f.email && <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0" /><a href={`mailto:${f.email}`} className="min-w-0 truncate hover:underline">{f.email}</a></li>}
                      {f.hours && <li className="flex gap-2.5"><Clock size={16} className="mt-0.5 shrink-0" /><div>{f.hours.map((h) => <div key={h}>{h}</div>)}</div></li>}
                    </ul>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
