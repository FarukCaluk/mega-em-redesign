import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Car, ShieldCheck, FlaskConical, GraduationCap } from 'lucide-react'
import { swatches } from '../data/content'
import { franchises } from '../data/franchises'
import PartnersMarquee from '../components/PartnersMarquee'
import Reveal from '../components/Reveal'
import Hero from '../components/Hero'
import TiltCard from '../components/TiltCard'

// ponytail: tekst i slika za svaki stub stižu od klijenta — dodaj `image` kad bude gotova
const pillars: { title: string; desc: string; icon: typeof Car; image?: string }[] = [
  { title: 'Autoreparatura', desc: 'MIPA boje i lakovi, kitovi, primeri, abrazivi, alati i oprema za profesionalnu autoreparaturu.', icon: Car },
  { title: 'Sistemi za antikorozivnu zaštitu', desc: 'Premazi i sistemi za zaštitu metalnih površina od korozije u industriji i građevinarstvu.', icon: ShieldCheck },
  { title: 'Aditivi za građevinsku hemiju', desc: 'Sirovine i aditivi za proizvodnju fasadnih sistema i građevinskih materijala.', icon: FlaskConical },
]

const features = [
  { n: '01', title: 'Dostava na adresu', desc: 'Brza dostava iz našeg skladišta u Visokom širom BiH.' },
  { n: '02', title: 'Tehničko savjetovanje', desc: 'Tehničko savjetovanje i demonstracije proizvoda kroz edukacijski centar u Visokom ili na Vašoj adresi.' },
  { n: '03', title: '30+ svjetskih brendova', desc: 'Zastupamo renomirane proizvođače hemikalija, boja i opreme.' },
]

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-semibold text-ink">Tri stuba našeg asortimana</h2>
          <Link to="/proizvodi" className="hidden shrink-0 items-center gap-1.5 font-semibold text-primary hover:underline sm:flex">
            Katalog proizvoda <ArrowRight size={16} />
          </Link>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => {
            const color = swatches[i % swatches.length]
            return (
              <Reveal key={p.title} delay={i * 80} className="h-full">
                <TiltCard glow={color} className="overflow-hidden !bg-surface">
                  <div className="flex aspect-[16/10] items-center justify-center" style={{ background: `${color}14` }}>
                    {p.image ? <img loading="lazy" decoding="async" src={p.image} alt={p.title} className="h-full w-full object-cover" /> : <p.icon size={44} style={{ color }} />}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-300 group-hover/tilt:text-[var(--glow)]">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted">{p.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="grain bg-deep py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-md">
            <h2 className="text-3xl font-semibold">Zašto Mega-Em</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-white/10 border-t border-white/10">
            {features.map((f, i) => (
              <Reveal key={f.n} delay={i * 100} variant={i % 2 ? 'right' : 'left'} className="group grid gap-4 py-8 transition-colors duration-300 hover:bg-white/[0.03] sm:grid-cols-[80px_1fr] sm:items-center sm:px-4">
                <span className="font-display text-3xl font-semibold transition-colors duration-300" style={{ color: swatches[(i + 1) % swatches.length] }}>{f.n}</span>
                <div className="grid gap-1 sm:grid-cols-[1fr_1.4fr] sm:items-center sm:gap-8">
                  <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-white/60">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-3xl bg-deep p-8 text-white sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/40 blur-[90px]" />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <GraduationCap size={32} className="text-primary-light" />
                <h2 className="mt-4 text-3xl font-semibold">Rezervišite termin u edukacijskom centru</h2>
                <p className="mt-3 text-white/70">Edukacijski centar je dostupan za sve naše partnere, popunite formular i pošaljite zahtjev.</p>
              </div>
              <Link to="/edukacijski-centar" className="flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25">
                Popunite formular <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-3xl font-semibold text-ink">Pronađite nas u vašem gradu</h2>
            <p className="mt-2 text-muted">14 franšiznih poslovnica širom BiH</p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {franchises.map((f, i) => {
              const color = swatches[(i + 1) % swatches.length]
              return (
                <Reveal key={f.slug} delay={(i % 4) * 60}>
                  <TiltCard glow={color}>
                    <Link to={`/franzizni-partneri#${f.slug}`} className="flex items-center gap-3 p-4">
                      <MapPin className="shrink-0 transition-colors duration-300 group-hover/tilt:text-[var(--glow)]" style={{ color }} size={20} />
                      <span className="font-medium text-ink">{f.city}</span>
                    </Link>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-muted">Naši partneri</p>
          <PartnersMarquee />
        </div>
      </section>
    </>
  )
}
