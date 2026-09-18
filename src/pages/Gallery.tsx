import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <PageIntro eyebrow="Galerija" title="Iz naših poslovnica i skladišta" />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((src, i) => (
            <Reveal key={src} delay={(i % 8) * 40}>
              <button onClick={() => setActive(i)} className="group aspect-square w-full overflow-hidden rounded-xl bg-surface">
                <img src={src} alt={`Mega-Em galerija ${i + 1}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {active !== null && (
        <div className="animate-fade-up fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6" style={{ animationDuration: '0.2s' }} onClick={() => setActive(null)}>
          <button className="absolute right-6 top-6 text-white/70 transition hover:scale-110 hover:text-white" onClick={() => setActive(null)}>
            <X size={28} />
          </button>
          <button
            className="absolute left-4 text-white/70 transition hover:scale-110 hover:text-white sm:left-8"
            onClick={(e) => { e.stopPropagation(); setActive((active - 1 + galleryImages.length) % galleryImages.length) }}
          >
            <ChevronLeft size={36} />
          </button>
          <img key={active} src={galleryImages[active]} alt="" className="animate-scale-in max-h-[85vh] max-w-[85vw] rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
          <button
            className="absolute right-4 text-white/70 transition hover:scale-110 hover:text-white sm:right-8"
            onClick={(e) => { e.stopPropagation(); setActive((active + 1) % galleryImages.length) }}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  )
}
