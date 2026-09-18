import { Link } from 'react-router-dom'
import { stats, employeeGrowth, brandTimeline, swatches } from '../data/content'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import PageIntro from '../components/PageIntro'
import TiltCard from '../components/TiltCard'
import { useInView } from '../hooks/useInView'

const paragraphs = [
  'U februaru 1996. godine, supružnici Adna i Mugdim Efendira osnovali su preduzeće Mega-Em d.o.o., čija je osnovna djelatnost bila trgovina građevinskim materijalom na veliko.',
  'Godine 1998. firma dobiva zastupništvo za Bosnu i Hercegovinu bijelog cementa kompanije Hirocem Slovačka, kasnije Holcim, odnosno današnji CRH. Bijeli cement je danas jedan od najprepoznatljivijih proizvoda iz Mega-Em portfolija.',
  'Kako su najveći potrošači bijelog cementa bili proizvođači fasada i betonskih galanterija, firma uviđa priliku da se dodatno pozicionira kod tih klijenata te širi paletu proizvoda na asortiman građevinskih aditiva i boja za betonske proizvode. Kompanija počinje upošljavati tehničke kadrove te svojim klijentima pomaže u tehničkom savjetovanju.',
  'Godine 2009. Mega-Em širi poslovanje u segmentu maloprodaje i otvara prvu poslovnicu "Mega Color" u Visokom, specijaliziranu za prodaju boja, lakova i autoreparaturnih materijala. Danas Mega-Em broji šest maloprodajnih objekata na teritoriji središnje Bosne.',
  'Godine 2011. kompanija širi asortiman u veleprodaji i maloprodaji te započinje saradnju sa njemačkom kompanijom Mipa za distribuciju proizvoda na teritoriji BiH — danas jedan od naših najprepoznatljivijih proizvoda iz oblasti autoreparaturnih materijala i industrijskih premaza. Jedina smo kompanija u BiH koja pored prodajnih predstavnika svojim klijentima nudi usluge tehničkog savjetovanja i demonstracije proizvoda.',
]

export default function About() {
  const maxCount = Math.max(...employeeGrowth.map((e) => e.count))
  const { ref: chartRef, inView: chartInView } = useInView<HTMLDivElement>(0.3)

  return (
    <>
      <PageIntro eyebrow="O nama" title="Historijat kompanije" />

      <section className="mx-auto max-w-3xl px-6 py-16">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={Math.min(i * 40, 160)} variant={i % 2 ? 'right' : 'left'}>
            <p className={`leading-relaxed ${i === 0 ? 'text-lg text-ink/80' : 'mt-5 text-muted'}`}>{p}</p>
          </Reveal>
        ))}
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-4">
          {stats.map((s, i) => {
            const color = swatches[i % swatches.length]
            return (
              <Reveal key={s.label} delay={i * 100} className="h-full">
                <TiltCard glow={color} className="text-center">
                  <div className="p-6">
                    <div className="text-3xl font-semibold transition-colors duration-300 group-hover/tilt:text-[var(--glow)]" style={{ color }}>
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-sm text-muted">{s.label}</div>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <Reveal className="text-center">
          <h2 className="text-3xl font-semibold text-ink">Rast tima kroz godine</h2>
          <p className="mt-2 text-muted">Broj zaposlenih od osnivanja do danas</p>
        </Reveal>
        <div ref={chartRef} className="mt-10 flex items-end justify-between gap-2">
          {employeeGrowth.map((e, i) => {
            const color = swatches[i % swatches.length]
            return (
              <div key={e.year} className="flex flex-1 flex-col items-center gap-2">
                <span className={`text-sm font-bold text-ink transition-opacity duration-500 ${chartInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${i * 90 + 400}ms` }}>
                  {e.count}
                </span>
                <div
                  className="w-full rounded-t-md transition-[height] duration-700 ease-out"
                  style={{ height: chartInView ? `${(e.count / maxCount) * 140}px` : 0, transitionDelay: `${i * 90}ms`, background: color }}
                />
                <span className="text-xs text-muted">{e.year}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal className="text-center">
            <h2 className="text-3xl font-semibold text-ink">Naši brendovi kroz godine</h2>
            <p className="mt-2 text-muted">Zastupništva brendova po godini uvođenja</p>
          </Reveal>
          <div className="mt-10 space-y-3">
            {brandTimeline.map((b, i) => {
              const color = swatches[i % swatches.length]
              return (
                <Reveal key={i} delay={Math.min(i * 40, 400)}>
                  <TiltCard glow={color}>
                    <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:gap-6">
                      <span className="w-16 shrink-0 font-bold transition-colors duration-300 group-hover/tilt:text-[var(--glow)]" style={{ color }}>{b.year}</span>
                      <span className="text-sm text-ink/80">{b.brands}</span>
                    </div>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold text-ink">Upoznajte ljude iza Mega-Em</h2>
          <Link to="/nas-tim" className="mt-5 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25">
            Naš tim
          </Link>
        </Reveal>
      </section>
    </>
  )
}
