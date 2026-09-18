import { Phone, Mail, MapPin, Clock, Truck } from 'lucide-react'
import { FacebookIcon, InstagramIcon } from '../components/SocialIcons'
import { wholesale, retailLocations } from '../data/locations'
import type { Location } from '../data/locations'
import { swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import TiltCard from '../components/TiltCard'

function LocationCard({ l, featured = false, delay = 0, color = swatches[0] }: { l: Location; featured?: boolean; delay?: number; color?: string }) {
  return (
    <Reveal id={l.slug} delay={delay} className="h-full scroll-mt-24">
      <TiltCard glow={color} className={featured ? 'grain !border-transparent !bg-deep text-white' : ''}>
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 group-hover/tilt:scale-125" style={{ background: color }} />
              <h3 className="text-lg font-bold transition-colors duration-300 group-hover/tilt:text-[var(--glow)]">{l.name}</h3>
            </div>
            {l.delivery && (
              <span
                className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${featured ? 'bg-white/10' : ''}`}
                style={featured ? undefined : { background: '#1FA9A01a', color: '#1FA9A0' }}
              >
                <Truck size={12} /> Dostava
              </span>
            )}
          </div>

          <ul className={`mt-4 space-y-2.5 text-sm ${featured ? 'text-white/70' : 'text-muted'}`}>
            <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0" /> {l.address}</li>
            <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0" /><a href={`tel:${l.phone.replace(/\D/g, '')}`} className="hover:underline">{l.phone}</a></li>
            <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0" /><a href={`mailto:${l.email}`} className="hover:underline">{l.email}</a></li>
            <li className="flex gap-2.5"><Clock size={16} className="mt-0.5 shrink-0" /><div>{l.hours.map((h) => <div key={h}>{h}</div>)}</div></li>
          </ul>

          <div className={`mt-5 border-t pt-4 ${featured ? 'border-white/10' : 'border-black/5'}`}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-60">Tim</p>
            <ul className="space-y-1 text-sm">
              {l.team.map((t) => (
                <li key={t.name} className="flex justify-between gap-3">
                  <span className="font-medium">{t.name}</span>
                  <span className="opacity-60">{t.role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex gap-3">
            {l.social.includes('facebook') && (
              <a href="https://www.facebook.com/megacolorbih" target="_blank" rel="noreferrer" className={`rounded-full p-2 transition hover:scale-110 ${featured ? 'bg-white/10' : 'bg-surface'} hover:text-[var(--glow)]`}><FacebookIcon size={14} /></a>
            )}
            {l.social.includes('instagram') && (
              <a href="https://www.instagram.com/mega_em_d.o.o._visoko/" target="_blank" rel="noreferrer" className={`rounded-full p-2 transition hover:scale-110 ${featured ? 'bg-white/10' : 'bg-surface'} hover:text-[var(--glow)]`}><InstagramIcon size={14} /></a>
            )}
          </div>
        </div>
      </TiltCard>
    </Reveal>
  )
}

export default function Locations() {
  return (
    <>
      <PageIntro
        eyebrow="Poslovne jedinice"
        title="Veleprodaja i naše poslovnice"
        description="Centralno skladište u Visokom i šest Mega Color prodajnih mjesta u središnjoj Bosni."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <LocationCard l={wholesale} featured />
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><h2 className="mb-8 text-2xl font-semibold text-ink">Mega Color poslovnice</h2></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {retailLocations.map((l, i) => (
              <LocationCard key={l.slug} l={l} delay={(i % 3) * 80} color={swatches[(i + 1) % swatches.length]} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
