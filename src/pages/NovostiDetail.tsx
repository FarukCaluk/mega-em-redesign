import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar } from 'lucide-react'
import { newsPosts } from '../data/news'
import { swatches } from '../data/content'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'

export default function NovostiDetail() {
  const { slug } = useParams()
  const post = newsPosts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/novosti" replace />

  const color = swatches[newsPosts.indexOf(post) % swatches.length]

  return (
    <>
      <PageIntro eyebrow="Novosti" title={post.title} description={post.date} />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/novosti" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary">
          <ArrowLeft size={16} /> Sve novosti
        </Link>

        <Reveal>
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white" style={{ background: color }}>
            {post.category}
          </span>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted">
            <Calendar size={15} /> {post.date}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-6 aspect-[16/9] overflow-hidden rounded-3xl">
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-8 space-y-5">
          {post.content.map((p, i) => (
            <p key={i} className="leading-relaxed text-ink/80">{p}</p>
          ))}
        </Reveal>
      </section>
    </>
  )
}
