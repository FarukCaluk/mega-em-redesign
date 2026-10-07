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
  return (
    <>
      <PageIntro
        eyebrow="Upoznajte naš tim"
        title="Naš tim"
        description="Već duži niz godina sarađujemo sa vodećim domaćim i stranim kompanijama. Svim našim partnerima nudimo tehničko savjetovanje i demonstraciju proizvoda."
      />

      <section className="mx-auto max-w-6xl space-y-14 px-6 py-16">
        {departments.map((d, di) => (
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
                          <a href={`tel:${p.phone.replace(/\D/g, '')}`} className="mt-3 flex items-center justify-center gap-1.5 text-xs" style={{ color }}>
                            <Phone size={12} className="shrink-0" /> {p.phone}
                          </a>
                        )}
                        {p.email && (
                          <a href={`mailto:${p.email}`} className="mt-2 flex items-center justify-center gap-1.5 text-xs" style={{ color }}>
                            <Mail size={12} className="shrink-0" /> <span className="min-w-0 truncate">{p.email}</span>
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
      </section>
    </>
  )
}
