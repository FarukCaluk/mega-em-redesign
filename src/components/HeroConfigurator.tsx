import { lazy, Suspense, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CarConfigurator = lazy(() => import('./three/CarConfigurator'))

const COLORS = [
  { name: 'Metallic Silver', hex: '#c7cad1' },
  { name: 'Racing Red', hex: '#c81d25' },
  { name: 'Midnight Purple', hex: '#4a1259' },
  { name: 'Pearl White', hex: '#eef0f2' },
  { name: 'Stealth Black', hex: '#17171b' },
  { name: 'Ocean Blue', hex: '#1a5fb4' },
]

export default function HeroConfigurator() {
  const [color, setColor] = useState(COLORS[0])

  return (
    <div className="flex w-full flex-col items-center">
      <div className="h-[360px] w-full sm:h-[440px] lg:h-[560px] xl:h-[620px]">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-primary-light" />
            </div>
          }
        >
          <CarConfigurator color={color.hex} />
        </Suspense>
      </div>

      <div className="mt-4 w-full max-w-md text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={color.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-white/50"
          >
            Megacolor nijansa — <span className="font-semibold text-white">{color.name}</span>
          </motion.p>
        </AnimatePresence>

        <div className="mt-4 flex justify-center gap-3 overflow-x-auto px-2 pb-2">
          {COLORS.map((c) => (
            <motion.button
              key={c.hex}
              onClick={() => setColor(c)}
              aria-label={c.name}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              style={{ background: c.hex }}
              className={`h-9 w-9 shrink-0 rounded-full border-2 transition-colors duration-300 ${
                color.hex === c.hex ? 'border-white shadow-[0_0_0_3px_rgba(255,255,255,0.25)]' : 'border-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
