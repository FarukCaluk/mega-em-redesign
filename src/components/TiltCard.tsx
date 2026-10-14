import type { CSSProperties, ReactNode } from 'react'

export default function TiltCard({ children, glow, className = '', style }: { children: ReactNode; glow: string; className?: string; style?: CSSProperties }) {
  return (
    <div
      style={{ '--glow': glow, '--glow-shadow': `${glow}33`, ...style } as CSSProperties}
      className={`group/tilt h-full rounded-2xl border border-black/5 bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-18px_var(--glow-shadow)] active:scale-[0.97] ${className}`}
    >
      {children}
    </div>
  )
}
