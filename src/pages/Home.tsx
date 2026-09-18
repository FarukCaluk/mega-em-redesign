import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { productCategories, swatches } from '../data/content'
import { retailLocations } from '../data/locations'
import PartnersMarquee from '../components/PartnersMarquee'
import Reveal from '../components/Reveal'
import Hero from '../components/Hero'
import TiltCard from '../components/TiltCard'

const features = [
  { n: '01', title: 'Dostava na adresu', desc: 'Brza dostava iz našeg skladišta u Visokom širom BiH.' },
  { n: '02', title: 'Tehničko savjetovanje', desc: 'Jedini u BiH nudimo stručno tehničko savjetovanje i demonstraciju proizvoda.' },
  { n: '03', title: '30+ svjetskih brendova', desc: 'Zastupamo renomirane proizvođače hemikalija, boja i alata.' },
]

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold text-ink">Šta radimo</h2>
            <p className="mt-2 max-w-md text-muted">Kompletan asortiman za autoreparaturu, građevinarstvo i industriju.</p>
          </div>
          <Link to="/proizvodi" className="hidden shrink-0 items-center gap-1.5 font-semibold text-primary hover:underline sm:flex">
            Svi proizvodi <ArrowRight size={16} />
          </Link>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {productCategories.slice(0, 4).map((c, i) => {
            if (i === 0) {
              return (
                <Reveal key={c.title} delay={i * 80} className="rounded-2xl bg-primary p-7 text-white transition hover:-translate-y-1 lg:col-span-2 lg:row-span-2 lg:p-9">
                  <span className="font-display text-sm text-white/60">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-white/75">{c.desc}</p>
                </Reveal>
              )
            }
            const color = swatches[i % swatches.length]
            return (
              <Reveal key={c.title} delay={i * 80} className="h-full lg:col-span-2">
                <TiltCard glow={color} className="!bg-surface">
                  <div className="p-7">
                    <span className="font-display text-sm transition-colors duration-300 group-hover/tilt:text-[var(--glow)]" style={{ color }}>0{i + 1}</span>
                    <h3 className="mt-3 font-display text-xl font-semibold text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted">{c.desc}</p>
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

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-3xl font-semibold text-ink">Pronađite nas u vašem gradu</h2>
            <p className="mt-2 text-muted">Šest Mega Color prodajnih mjesta u centralnoj Bosni.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {retailLocations.map((l, i) => {
              const color = swatches[(i + 1) % swatches.length]
              return (
                <Reveal key={l.slug} delay={i * 60}>
                  <TiltCard glow={color}>
                    <Link to={`/poslovne-jedinice#${l.slug}`} className="flex items-center gap-3 p-4">
                      <MapPin className="shrink-0 transition-colors duration-300 group-hover/tilt:text-[var(--glow)]" style={{ color }} size={20} />
                      <span className="font-medium text-ink">{l.name}</span>
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
