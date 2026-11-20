import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Check, ChevronDown, type LucideIcon } from 'lucide-react'

// Padajuća lista u stilu sajta (umjesto običnog <select>). Radi sa tastaturom, a `name` + `required` rade u formularu kao kod običnog polja.
export default function Select({ options, placeholder = 'Odaberite', name, required, icon: Icon, value: controlled, onChange }: {
  options: string[]
  placeholder?: string
  name?: string
  required?: boolean
  icon?: LucideIcon
  value?: string
  onChange?: (v: string) => void
}) {
  const [inner, setInner] = useState('')
  const value = controlled ?? inner
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => !root.current?.contains(e.target as Node) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const pick = (v: string) => {
    setInner(v)
    onChange?.(v)
    setOpen(false)
  }
  const toggle = () => {
    setActive(Math.max(0, options.indexOf(value)))
    setOpen((o) => !o)
  }
  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) return toggle()
      setActive((a) => (a + (e.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length)
    } else if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault()
      pick(options[active])
    }
  }

  return (
    <div ref={root} className="relative" onKeyDown={onKey}>
      {Icon && <Icon size={16} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted" />}
      {/* skriveno polje: šalje vrijednost u formular i daje poruku "popunite polje" kad je obavezno */}
      {name && <input name={name} value={value} required={required} onChange={() => {}} tabIndex={-1} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-0 opacity-0" />}
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={toggle}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white py-3 pr-4 text-left text-sm outline-none transition ${Icon ? 'pl-11' : 'pl-4'} ${open ? 'border-primary' : 'border-black/10 focus-visible:border-primary'}`}
      >
        <span className={value ? 'text-ink' : 'text-muted'}>{value || placeholder}</span>
        <ChevronDown size={16} className={`shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul id={listId} role="listbox" className="animate-scale-in absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-primary/15 bg-white p-1.5 shadow-xl shadow-primary/10">
          {options.map((o, i) => (
            <li
              key={o}
              role="option"
              aria-selected={o === value}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(o)}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3.5 py-2.5 text-sm transition-colors ${i === active ? 'bg-primary/10 text-primary' : 'text-ink'} ${o === value ? 'font-semibold' : ''}`}
            >
              {o}
              {o === value && <Check size={15} className="text-primary" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
