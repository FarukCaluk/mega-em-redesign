import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import { newsPosts } from '../data/news'
import { swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import TiltCard from '../components/TiltCard'

export default function Novosti() {
  const [featured, ...rest] = newsPosts

  return (
    <>
      <PageIntro eyebrow="Novosti" title="Šta je novo kod Mega-Em" description="Vijesti iz kompanije, novi proizvodi i savjeti iz struke." />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <Link to={`/novosti/${featured.slug}`} className="block">
            <TiltCard glow={swatches[0]} className="overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
                  <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition duration-700 group-hover/tilt:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <span className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white" style={{ background: swatches[0] }}>
                    {featured.category}
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">{featured.title}</h2>
                  <p className="mt-3 text-muted">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm text-muted">
                    <Calendar size={15} /> {featured.date}
                  </div>
                </div>
              </div>
            </TiltCard>
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => {
            const color = swatches[(i + 1) % swatches.length]
            return (
              <Reveal key={post.slug} delay={i * 80} className="h-full">
                <Link to={`/novosti/${post.slug}`} className="block h-full">
                  <TiltCard glow={color} className="h-full overflow-hidden">
                    <div className="flex h-full flex-col">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover/tilt:scale-105" />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide" style={{ background: `${color}1a`, color }}>
                          {post.category}
                        </span>
                        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">{post.title}</h3>
                        <p className="mt-2 flex-1 text-sm text-muted">{post.excerpt}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                          <Calendar size={13} /> {post.date}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
