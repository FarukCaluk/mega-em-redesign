import PageIntro from '../components/PageIntro'
import ProductCatalog from '../components/ProductCatalog'

export default function Products() {
  return (
    <>
      <PageIntro eyebrow="Katalog proizvoda" title="Katalog proizvoda" description="Pretražite katalog po nazivu, brendu, šifri ili kategoriji proizvoda." />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <ProductCatalog />
      </section>
    </>
  )
}
