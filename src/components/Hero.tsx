import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { stats } from '../data/content'
import Counter from './Counter'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Hero() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  function search(e: FormEvent) {
    e.preventDefault()
    navigate(q.trim() ? `/proizvodi?q=${encodeURIComponent(q.trim())}` : '/proizvodi')
  }

  return (
    <section className="grain relative overflow-hidden bg-ink text-white">
      {/* zamućena pozadina: kompanija + edukacijski centar */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-2" aria-hidden>
        <img src="/images/team/tim-mega-em-bg.webp" alt="" className="h-full w-full scale-105 object-cover blur-[3px]" />
        <img src="/images/trening-centar/trening-centar-tim-bg.webp" alt="" className="h-full w-full scale-105 object-cover blur-[3px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-primary-light/20 blur-[100px]" />

      <motion.div variants={container} initial="hidden" animate="show" className="relative mx-auto max-w-3xl px-6 pb-14 pt-28 text-center sm:pt-32 lg:pb-16">
        <motion.form variants={item} onSubmit={search} className="glass-dark relative flex items-center rounded-full p-1.5">
          <Search size={20} className="pointer-events-none absolute left-5 text-white/60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pretraži proizvode"
            aria-label="Pretraži proizvode"
            className="min-w-0 flex-1 bg-transparent py-3 pl-12 pr-3 text-base text-white outline-none placeholder:text-white/50"
          />
          <button type="submit" className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark">
            Traži
          </button>
        </motion.form>

        <motion.h1 variants={item} className="mt-12 text-5xl font-semibold leading-[1.05] md:text-7xl">
          Vaš partner
          <br />
          <span className="bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">od povjerenja</span>
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-5 max-w-xl text-lg text-white/70">
          Autoreparatura i industrijski premazi, distribucija aditiva za fasadne i građevinske
          sisteme, boje, lakovi i alati.
        </motion.p>

        <motion.div variants={item} className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-2xl font-semibold sm:text-3xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
