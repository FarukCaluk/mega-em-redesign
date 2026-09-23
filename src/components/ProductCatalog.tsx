import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, PackageSearch, SlidersHorizontal, ArrowRight } from 'lucide-react'
import { products, productCategoryList, productBrandList } from '../data/products'
import { swatches } from '../data/content'
import TiltCard from './TiltCard'

function FilterGroup({
  title,
  options,
  active,
  onToggle,
}: {
  title: string
  options: string[]
  active: string[]
  onToggle: (v: string) => void
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">{title}</p>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex cursor-pointer items-start gap-2.5 text-sm text-ink/80">
            <input
              type="checkbox"
              checked={active.includes(opt)}
              onChange={() => onToggle(opt)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-primary focus:ring-primary/40"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default function ProductCatalog() {
  const [query, setQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [activeBrands, setActiveBrands] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      if (activeCategories.length > 0 && !activeCategories.includes(p.category)) return false
      if (activeBrands.length > 0 && !activeBrands.includes(p.brand)) return false
      if (!q) return true
      return [p.name, p.brand, p.category, p.sku, p.description].some((field) => field.toLowerCase().includes(q))
    })
  }, [query, activeCategories, activeBrands])

  const activeCount = activeCategories.length + activeBrands.length

  const filterPanel = (
    <div className="space-y-7">
      <FilterGroup title="Kategorija" options={productCategoryList} active={activeCategories} onToggle={(v) => toggle(activeCategories, setActiveCategories, v)} />
      <FilterGroup title="Brend" options={productBrandList} active={activeBrands} onToggle={(v) => toggle(activeBrands, setActiveBrands, v)} />
      {activeCount > 0 && (
        <button
          onClick={() => {
            setActiveCategories([])
            setActiveBrands([])
          }}
          className="text-sm font-medium text-primary hover:underline"
        >
          Poništi filtere ({activeCount})
        </button>
      )}
    </div>
  )

  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr] lg:items-start lg:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-2xl border border-black/5 bg-surface p-6">{filterPanel}</div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pretraži po nazivu, brendu, šifri..."
              className="w-full rounded-full border border-black/10 bg-white py-3.5 pl-11 pr-11 text-sm outline-none transition focus:border-primary"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Obriši pretragu" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink">
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3.5 text-sm font-medium text-ink lg:hidden"
          >
            <SlidersHorizontal size={16} /> Filteri {activeCount > 0 && `(${activeCount})`}
          </button>
        </div>

        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-4 rounded-2xl border border-black/5 bg-surface p-6">{filterPanel}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-5 text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? 'proizvod' : 'proizvoda'}
        </p>

        <motion.div layout className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const color = swatches[productCategoryList.indexOf(p.category) % swatches.length]
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: (i % 6) * 0.03 }}
                >
                  <Link to={`/proizvodi/${p.id}`} className="block h-full">
                    <TiltCard glow={color} className="h-full !border-primary/10 !bg-gradient-to-br !from-primary/[0.06] !to-primary-light/[0.02]">
                      <div className="flex h-full flex-col">
                        {p.image ? (
                          <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-white">
                            <img src={p.image} alt={p.name} className="h-full w-full object-contain p-4 transition duration-500 group-hover/tilt:scale-105" />
                          </div>
                        ) : (
                          <div className="flex aspect-[4/3] items-center justify-center rounded-t-2xl" style={{ background: `${color}14` }}>
                            <span className="flex h-14 w-14 items-center justify-center rounded-xl text-sm font-bold uppercase text-white" style={{ background: color }}>
                              {p.brand.slice(0, 2)}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-xs font-medium uppercase tracking-wide" style={{ color }}>{p.brand}</p>
                            <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted">{p.sku}</span>
                          </div>
                          <h3 className="mt-2 font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover/tilt:text-[var(--glow)]">{p.name}</h3>
                          <p className="mt-2 flex-1 text-sm text-muted line-clamp-3">{p.description}</p>
                          <span className="mt-4 flex items-center gap-1.5 text-sm font-medium" style={{ color }}>
                            Detalji <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <PackageSearch size={36} className="text-muted" />
            <p className="text-muted">Nema proizvoda koji odgovaraju pretrazi.</p>
          </div>
        )}
      </div>
    </div>
  )
}
