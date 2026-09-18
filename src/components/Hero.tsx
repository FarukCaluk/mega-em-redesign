import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { stats } from '../data/content'
import Counter from './Counter'
import Magnetic from './Magnetic'
import HeroConfigurator from './HeroConfigurator'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Hero() {
  return (
    <section className="grain relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-primary-light/20 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-6 pb-14 pt-24 lg:grid-cols-[0.85fr_1.15fr] lg:pb-16 lg:pt-28">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light" /> Od 1996. godine u Bosni i Hercegovini
          </motion.span>

          <motion.h1 variants={item} className="mt-5 text-5xl font-semibold leading-[1.05] md:text-7xl">
            Vaš partner
            <br />
            <span className="bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">od povjerenja</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-md text-lg text-white/60">
            Autoreparatura i industrijski premazi, distribucija aditiva za fasadne i građevinske
            sisteme, boje, lakovi i alati.
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap gap-4">
            <Magnetic>
              <Link
                to="/proizvodi"
                className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-white shadow-[0_0_0_0_rgba(130,9,155,0.45)] transition-all duration-300 hover:shadow-[0_0_32px_6px_rgba(130,9,155,0.45)]"
              >
                Pogledaj proizvode
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link
              to="/kontakt"
              className="flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-white/90 backdrop-blur transition hover:border-white/40 hover:bg-white/5"
            >
              Kontaktiraj nas
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-5">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-semibold">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="relative flex items-center justify-center py-2"
        >
          <HeroConfigurator />
        </motion.div>
      </div>
    </section>
  )
}
