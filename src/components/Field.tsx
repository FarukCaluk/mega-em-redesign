import type { InputHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

export const inputClass = 'w-full rounded-xl border border-black/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary'

export default function Field({ icon: Icon, ...props }: { icon: LucideIcon } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
      <input {...props} className={inputClass} />
    </div>
  )
}
