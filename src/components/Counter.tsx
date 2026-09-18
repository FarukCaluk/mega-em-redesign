import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

export default function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1000
    let start: number | null = null
    let raf: number
    const step = (t: number) => {
      if (start === null) start = t
      const progress = Math.min((t - start) / duration, 1)
      setDisplay(Math.round(progress * value))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return <span ref={ref}>{display}{suffix}</span>
}
