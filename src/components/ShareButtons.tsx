import { useState } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'

// dijeljenje objave: dugme sistema (telefon) + Facebook, WhatsApp, Viber, LinkedIn, X + kopiranje linka
export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const u = encodeURIComponent(url)
  const text = encodeURIComponent(title)
  const nets = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${text}%20${u}` },
    { name: 'Viber', href: `viber://forward?text=${text}%20${u}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${text}` },
  ]
  const pill = 'inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-primary hover:text-primary'
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Kopirajte link:', url)
    }
  }

  return (
    <div className="mt-10 border-t border-black/10 pt-6">
      <p className="mb-3 text-sm font-semibold text-ink">Podijelite objavu</p>
      <div className="flex flex-wrap gap-2.5">
        {canShare && (
          <button type="button" onClick={() => navigator.share({ title, url }).catch(() => {})} className={`${pill} !border-primary !bg-primary !text-white hover:!bg-primary-dark`}>
            <Share2 size={15} /> Podijeli
          </button>
        )}
        {nets.map((n) => (
          <a key={n.name} href={n.href} target="_blank" rel="noreferrer noopener" className={pill}>
            {n.name}
          </a>
        ))}
        <button type="button" onClick={copy} className={pill}>
          {copied ? <Check size={15} /> : <Link2 size={15} />} {copied ? 'Link kopiran' : 'Kopiraj link'}
        </button>
      </div>
    </div>
  )
}
