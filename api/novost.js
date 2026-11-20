// Pregled linka za društvene mreže (Facebook, Messenger, Viber, WhatsApp, LinkedIn...).
// Njihovi botovi ne pokreću JavaScript, pa vercel.json njima (i samo njima) umjesto praznog index.html
// šalje ovu stranicu sa naslovom, opisom i slikom konkretne vijesti. Ljudi i dalje dobijaju običan sajt.
const PROJECT = 'w8dfy3y7'
const DATASET = process.env.VITE_SANITY_DATASET || 'production'
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
// "image-<id>-<WxH>-<ext>" -> JPG 1200x630 (botovi ne podržavaju svi webp)
const imageUrl = (ref) => {
  const m = /^image-(.+)-(\d+x\d+)-(\w+)$/.exec(ref || '')
  return m ? `https://cdn.sanity.io/images/${PROJECT}/${DATASET}/${m[1]}-${m[2]}.${m[3]}?w=1200&h=630&fit=crop&fm=jpg&q=80` : ''
}

export default async function handler(req, res) {
  const slug = String(req.query.slug || '')
  const origin = `https://${req.headers.host}`
  const url = `${origin}/novosti/${encodeURIComponent(slug)}`
  let post = null
  try {
    const q = encodeURIComponent('*[_type=="newsPost" && slug.current==$slug][0]{title, excerpt, "image": image.asset._ref}')
    const r = await fetch(`https://${PROJECT}.apicdn.sanity.io/v2025-01-01/data/query/${DATASET}?query=${q}&$slug=${encodeURIComponent(JSON.stringify(slug))}`, { signal: AbortSignal.timeout(4000) })
    post = (await r.json()).result
  } catch {
    /* bez Sanityja šalje se opšti pregled */
  }
  const title = post?.title ? `${post.title} — Mega-Em` : 'Mega-Em d.o.o. — Vaš partner od povjerenja'
  const desc = (post?.excerpt ? post.excerpt.slice(0, 200) : '') ||'Vijesti iz kompanije Mega-Em, novi proizvodi i savjeti iz struke.'
  const image = imageUrl(post?.image)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400')
  res.status(200).send(`<!doctype html>
<html lang="bs"><head><meta charset="utf-8"><title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="article"><meta property="og:site_name" content="Mega-Em">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${esc(url)}">
${image ? `<meta property="og:image" content="${esc(image)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${esc(image)}">` : '<meta name="twitter:card" content="summary">'}
<meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}">
<link rel="canonical" href="${esc(url)}"></head><body><h1>${esc(title)}</h1><p>${esc(desc)}</p><p><a href="${esc(url)}">${esc(url)}</a></p></body></html>`)
}
