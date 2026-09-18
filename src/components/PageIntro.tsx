import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import FlowLines from './FlowLines'

export default function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description?: string }) {
  return (
    <section className="grain relative overflow-hidden bg-ink pb-14 pt-24 text-white sm:pb-16 sm:pt-28">
      <div className="pointer-events-none absolute -left-32 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-[100px] sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-primary-light/15 blur-[90px] sm:h-80 sm:w-80" />
      <FlowLines />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary-light" /> {eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 text-4xl font-semibold sm:text-5xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-white/60"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
