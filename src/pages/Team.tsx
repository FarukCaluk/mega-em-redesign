import { useState } from 'react'
import { Phone, Mail } from 'lucide-react'
import { departments } from '../data/team'
import { swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import TiltCard from '../components/TiltCard'

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('')
}

export default function Team() {
  const [active, setActive] = useState('all')
  const shown = active === 'all' ? departments : departments.filter((d) => d.id === active)

  return (
    <>
      <PageIntro
        eyebrow="Upoznajte naš tim"
        title="Naš tim"
        description="Već duži niz godina sarađujemo sa vodećim domaćim i stranim kompanijama. Svim našim partnerima nudimo tehničko savjetovanje i demonstraciju proizvoda."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-wrap gap-2">
          {[{ id: 'all', label: 'Svi uposlenici' }, ...departments].map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium ring-1 transition active:scale-95 ${active === d.id ? 'bg-primary text-white ring-primary' : 'bg-white text-ink/70 ring-black/10 hover:text-primary'}`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="space-y-14">
        {shown.map((d, di) => (
          <div key={d.id}>
            <Reveal>
              <h2 className="mb-6 text-xl font-bold text-ink">{d.label}</h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {d.members.map((p, i) => {
                const color = swatches[(di + i) % swatches.length]
                return (
                  <Reveal key={p.name + p.role} delay={(i % 4) * 70} variant="scale" className="h-full">
                    <TiltCard glow={color} className="!border-primary/10 !bg-gradient-to-br !from-primary/[0.1] !to-primary-light/[0.04] text-center">
                      <div className="p-5">
                        <div
                          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white transition-transform duration-300 group-hover/tilt:scale-110"
                          style={{ background: color }}
                        >
                          {initials(p.name)}
                        </div>
                        <h3 className="mt-4 font-bold text-ink">{p.name}</h3>
                        <p className="mt-1 text-sm text-muted">{p.role}</p>
                        {p.phone && (
                          <a href={`tel:${p.phone.replace(/[^\d+]/g, '')}`} className="mt-3 flex items-center justify-center gap-1.5 text-xs" style={{ color }}>
                            <Phone size={12} className="shrink-0" /> {p.phone}
                          </a>
                        )}
                        {p.email && (
                          <a href={`mailto:${p.email}`} className="mt-2 flex items-center justify-center gap-1.5 text-xs" style={{ color }}>
                            <Mail size={12} className="shrink-0" /> <span className="min-w-0 break-all">{p.email}</span>
                          </a>
                        )}
                      </div>
                    </TiltCard>
                  </Reveal>
                )
              })}
            </div>
          </div>
        ))}
        </div>
      </section>
    </>
  )
}
