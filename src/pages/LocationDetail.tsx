import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, MapPin, Clock, Truck } from 'lucide-react'
import { FacebookIcon, InstagramIcon } from '../components/SocialIcons'
import { locations } from '../data/locations'
import { swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'

export default function LocationDetail() {
  const { slug } = useParams()
  const location = locations.find((l) => l.slug === slug)

  if (!location) return <Navigate to="/poslovne-jedinice" replace />

  const color = swatches[locations.indexOf(location) % swatches.length]

  return (
    <>
      <PageIntro eyebrow="Poslovne jedinice" title={location.name} description={location.address} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link to="/poslovne-jedinice" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary">
          <ArrowLeft size={16} /> Sve poslovnice
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="glass-purple rounded-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} />
                <h2 className="text-xl font-bold text-ink">{location.name}</h2>
              </div>
              {location.delivery && (
                <span className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-medium" style={{ background: '#1FA9A01a', color: '#1FA9A0' }}>
                  <Truck size={12} /> Dostava
                </span>
              )}
            </div>

            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0" /> {location.address}</li>
              <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0" /><a href={`tel:${location.phone.replace(/\D/g, '')}`} className="hover:underline">{location.phone}</a></li>
              <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0" /><a href={`mailto:${location.email}`} className="hover:underline">{location.email}</a></li>
              <li className="flex gap-2.5"><Clock size={16} className="mt-0.5 shrink-0" /><div>{location.hours.map((h) => <div key={h}>{h}</div>)}</div></li>
            </ul>

            <div className="mt-6 border-t border-primary/10 pt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Tim</p>
              <ul className="space-y-1.5 text-sm">
                {location.team.map((t) => (
                  <li key={t.name} className="flex justify-between gap-3">
                    <span className="font-medium text-ink">{t.name}</span>
                    <span className="text-muted">{t.role}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex gap-3">
              {location.social.includes('facebook') && (
                <a href="https://www.facebook.com/megacolorbih" target="_blank" rel="noreferrer" className="rounded-full bg-white p-2 transition hover:scale-110 hover:text-primary"><FacebookIcon size={14} /></a>
              )}
              {location.social.includes('instagram') && (
                <a href="https://www.instagram.com/mega_em_d.o.o._visoko/" target="_blank" rel="noreferrer" className="rounded-full bg-white p-2 transition hover:scale-110 hover:text-primary"><InstagramIcon size={14} /></a>
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <iframe
              title={`Lokacija ${location.name}`}
              className="h-full min-h-[320px] w-full rounded-2xl border-0"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(location.address)}&output=embed`}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
