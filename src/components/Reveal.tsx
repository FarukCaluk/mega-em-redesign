import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

const variants = {
  up: { hidden: 'opacity-0 translate-y-8', shown: 'opacity-100 translate-y-0' },
  left: { hidden: 'opacity-0 -translate-x-8', shown: 'opacity-100 translate-x-0' },
  right: { hidden: 'opacity-0 translate-x-8', shown: 'opacity-100 translate-x-0' },
  scale: { hidden: 'opacity-0 scale-90', shown: 'opacity-100 scale-100' },
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  id,
  variant = 'up',
}: {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
  variant?: keyof typeof variants
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const v = variants[variant]

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-out ${inView ? v.shown : v.hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
