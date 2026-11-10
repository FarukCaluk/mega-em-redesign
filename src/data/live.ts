// Sadržaj sajta. Početno je ugrađeni JSON iz builda (rezerva), a loadLive() ga pri pokretanju zamijeni svježim iz Sanityja,
// pa izmjene iz Studija stižu na sajt bez novog deploya.
import embedded from './generated/content.json'
import { PROJECT, QUERY, buildContent } from './sanityContent.js'

export type Content = typeof embedded
export let content: Content = embedded

const DATASET = import.meta.env.VITE_SANITY_DATASET || 'production'

// čeka najviše `timeout` ms; ako Sanity ne odgovori ili vrati prazno, ostaje ugrađeni sadržaj
export async function loadLive(timeout = 2000) {
  try {
    const res = await fetch(`https://${PROJECT}.apicdn.sanity.io/v2025-01-01/data/query/${DATASET}?query=${encodeURIComponent(QUERY)}`, {
      signal: AbortSignal.timeout(timeout),
    })
    if (!res.ok) return
    const fresh = buildContent((await res.json()).result, DATASET)
    if (fresh.products.length) content = fresh
  } catch {
    /* ostaje ugrađeni sadržaj */
  }
}
