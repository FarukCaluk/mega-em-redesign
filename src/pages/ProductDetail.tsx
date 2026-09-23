import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Tag, Boxes, Factory } from 'lucide-react'
import { products, productCategoryList } from '../data/products'
import { swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)

  if (!product) return <Navigate to="/proizvodi" replace />

  const color = swatches[productCategoryList.indexOf(product.category) % swatches.length]
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <>
      <PageIntro eyebrow="Proizvodi" title={product.name} description={product.category} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link to="/proizvodi" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary">
          <ArrowLeft size={16} /> Nazad na proizvode
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal variant="left">
            {product.image ? (
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-black/5 bg-white">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain p-10" />
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-3xl" style={{ background: `${color}14` }}>
                <span className="flex h-28 w-28 items-center justify-center rounded-2xl text-3xl font-bold uppercase text-white" style={{ background: color }}>
                  {product.brand.slice(0, 2)}
                </span>
              </div>
            )}
          </Reveal>

          <Reveal variant="right">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white" style={{ background: color }}>
              {product.category}
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink">{product.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{product.description}</p>

            <div className="mt-8 grid gap-4 rounded-2xl border border-black/5 bg-surface p-6 sm:grid-cols-3">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted"><Factory size={13} /> Proizvođač</p>
                <p className="mt-1.5 font-semibold text-ink">{product.brand}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted"><Tag size={13} /> Šifra</p>
                <p className="mt-1.5 font-semibold text-ink">{product.sku}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted"><Boxes size={13} /> Kategorija</p>
                <p className="mt-1.5 font-semibold text-ink">{product.category}</p>
              </div>
            </div>

            <Link
              to="/kontakt"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:translate-y-0"
            >
              Pitaj za dostupnost
            </Link>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h3 className="font-display text-xl font-semibold text-ink">Slični proizvodi</h3>
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
