import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { products, productCategoryList } from '../data/products'
import { swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'

const VARIANT_LIMIT = 15

// zadnji filteri iz kataloga (sačuvani u sessionStorage)
const savedSearch = () => {
  try {
    const s = sessionStorage.getItem('katalog-pretraga')
    return s ? `?${s}` : ''
  } catch {
    return ''
  }
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const [showAll, setShowAll] = useState(false)
  useEffect(() => setShowAll(false), [id])

  if (!product) return <Navigate to="/proizvodi" replace />

  const color = swatches[productCategoryList.indexOf(product.category) % swatches.length]
  // prikazuju se samo polja koja imaju vrijednost
  const fields = ([
    ['Naziv', product.name],
    ['Kategorija', product.category],
    ['Podkategorija', product.subcategory],
    ['Tercijarna kategorija', product.tertiary],
    ['Brend', product.brand],
  ] as [string, string | undefined][]).filter(([, v]) => v)
  const rows = product.variants ?? (product.packSize || product.onlineCode ? [{ name: product.name, pack: product.packSize ?? '', code: product.onlineCode ?? '' }] : [])
  const shownRows = showAll ? rows : rows.slice(0, VARIANT_LIMIT)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <>
      <PageIntro eyebrow="Katalog proizvoda" title={product.name} description={product.category} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link to={`/proizvodi${savedSearch()}`} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary">
          <ArrowLeft size={16} /> Nazad na katalog
        </Link>

        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal variant="left" className="mx-auto w-full max-w-sm lg:max-w-none">
            {product.image ? (
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-black/5 bg-white">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain p-6" />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl" style={{ background: `${color}14` }}>
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold uppercase text-white" style={{ background: color }}>
                  {(product.brand || product.name).slice(0, 2)}
                </span>
              </div>
            )}
          </Reveal>

          <Reveal variant="right">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white" style={{ background: color }}>
              {product.category}
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink">{product.name}</h2>
            <dl className="mt-8 grid gap-x-6 gap-y-5 rounded-2xl border border-black/5 bg-surface p-6 sm:grid-cols-2">
              {fields.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
                  <dd className="mt-1.5 font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {product.description && (
          <div className="mt-12">
            <h3 className="font-display text-xl font-semibold text-ink">Opis proizvoda</h3>
            <p className="mt-4 whitespace-pre-line rounded-2xl border border-black/5 bg-surface p-6 leading-relaxed text-muted">{product.description}</p>
          </div>
        )}

        {rows.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-xl font-semibold text-ink">Dostupne varijante</h3>
            <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
                  <tr><th className="px-3 py-3 sm:px-5">Naziv</th><th className="px-2 py-3 sm:px-5"><span className="sm:hidden">Kom. u pak.</span><span className="hidden sm:inline">Broj komada u paketu</span></th><th className="px-2 py-3 sm:px-5"><span className="sm:hidden">Šifra</span><span className="hidden sm:inline">Online šifra</span></th></tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {shownRows.map((v, i) => (
                    <tr key={i}><td className="px-3 py-3 font-medium text-ink sm:px-5">{v.name}</td><td className="px-2 py-3 text-muted sm:px-5">{v.pack || '—'}</td><td className="px-2 py-3 text-muted sm:px-5">{v.code || '—'}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            {rows.length > VARIANT_LIMIT && (
              <button
                onClick={() => setShowAll((v) => !v)}
                className="mx-auto mt-5 flex items-center gap-2 rounded-full border border-primary/20 px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                {showAll ? 'Prikaži manje' : `Prikaži sve (${rows.length})`}
                <ChevronDown size={16} className={`transition-transform ${showAll ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-20">
            <h3 className="font-display text-xl font-semibold text-ink">Povezani proizvodi</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} to={`/proizvodi/${p.id}`} className="rounded-2xl border border-black/5 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md">
                  <p className="text-xs font-medium uppercase tracking-wide" style={{ color }}>{p.brand}</p>
                  <p className="mt-1.5 font-semibold text-ink">{p.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
