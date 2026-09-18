import { useState, type CSSProperties } from 'react'
import { Phone, Mail } from 'lucide-react'
import { management, departments } from '../data/team'
import { swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import TiltCard from '../components/TiltCard'

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('')
}

export default function Team() {
  const [active, setActive] = useState<string>(departments[0].id)
  const shown = departments.find((d) => d.id === active)!
  const activeColor = swatches[departments.findIndex((d) => d.id === active) % swatches.length]

  return (
    <>
      <PageIntro
        eyebrow="Naš tim"
        title="Upoznajte naš tim"
        description="Već duži niz godina sarađujemo sa vodećim domaćim i stranim kompanijama. Jedini smo u BiH koji klijentima pružamo stručno tehničko savjetovanje."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-xl font-bold text-ink">Menadžment</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {management.map((m, i) => {
            const color = swatches[i % swatches.length]
            return (
              <Reveal key={m.name} delay={i * 70} variant="scale" className="h-full">
                <TiltCard glow={color} className="text-center">
                  <div className="p-5">
                    <div
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white transition-transform duration-300 group-hover/tilt:scale-110"
                      style={{ background: color }}
                    >
                      {initials(m.name)}
                    </div>
                    <h3 className="mt-4 font-bold text-ink">{m.name}</h3>
                    <p className="mt-1 text-sm text-muted">{m.role}</p>
                    {m.email && (
                      <a href={`mailto:${m.email}`} className="mt-3 flex items-center justify-center gap-1.5 text-xs transition-colors duration-300 group-hover/tilt:text-[var(--glow)]" style={{ color }}>
                        <Mail size={12} /> {m.email}
                      </a>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex flex-wrap gap-2">
            {departments.map((d, i) => {
              const color = swatches[i % swatches.length]
              const isActive = active === d.id
              return (
                <button
                  key={d.id}
                  onClick={() => setActive(d.id)}
                  className="rounded-full px-4 py-2 text-sm font-medium ring-1 ring-black/5 transition-all active:scale-95"
                  style={
                    isActive
                      ? { background: color, color: 'white', boxShadow: `0 4px 14px -4px ${color}99` }
                      : { background: 'white', color: 'var(--color-ink)', opacity: 0.7 }
                  }
                >
                  {d.label}
                </button>
              )
            })}
          </div>

          <div key={active} className="animate-fade-up divide-y divide-black/5 rounded-2xl bg-white ring-1 ring-black/5">
            {shown.members.map((m) => (
              <div key={m.name} className="flex flex-col gap-2 px-6 py-4 transition-colors hover:bg-surface/60 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-ink">{m.name}</p>
                  <p className="text-sm text-muted">{m.role}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted">
                  {m.phone && (
                    <a href={`tel:${m.phone.replace(/\D/g, '')}`} className="flex items-center gap-1.5 transition-colors hover:text-[var(--active)]" style={{ '--active': activeColor } as CSSProperties}>
                      <Phone size={14} /> {m.phone}
                    </a>
                  )}
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 transition-colors hover:text-[var(--active)]" style={{ '--active': activeColor } as CSSProperties}>
                      <Mail size={14} /> {m.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
