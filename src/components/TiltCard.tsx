import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children, glow, className = '', style }: { children: ReactNode; glow: string; className?: string; style?: CSSProperties }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ '--glow': glow, '--glow-shadow': `${glow}33`, ...style } as CSSProperties}
      className={`group/tilt h-full rounded-2xl border border-black/5 bg-white transition-shadow duration-300 hover:shadow-[0_16px_32px_-18px_var(--glow-shadow)] ${className}`}
    >
      {children}
    </motion.div>
  )
}
