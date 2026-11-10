// Upit i pretvaranje Sanity odgovora u sadržaj sajta. Koristi ga i build (scripts/fetch-content.mjs) i preglednik (src/data/live.ts).
export const PROJECT = 'w8dfy3y7'

export const QUERY = `{
  "products": *[_type == "product" && hidden != true] | order(name asc) {
    "id": slug.current, name, "brand": coalesce(brand->name, ""), "category": coalesce(category->title, ""), "subcategory": subcategory->title, "tertiary": tertiaryCategory->title, "sku": coalesce(sku, ""),
    "description": coalesce(description, ""), "image": image.asset._ref, intro, manufacturer,
    packSize, onlineCode, "variants": variants[]{name, pack, code}
  },
  "news": *[_type == "newsPost"] | order(pinned desc, date desc) {
    "slug": slug.current, title, "excerpt": coalesce(excerpt, ""), date, "category": coalesce(category, ""),
    "image": image.asset._ref, "content": content[]{"text": array::join(children[].text, "")}.text
  },
  "brands": *[_type == "brand" && showOnBrandsPage != false] | order(order asc) {name, "logo": logo.asset._ref, intro, long},
  "franchises": *[_type == "franchise"] | order(order asc) {name, city, address, phone, email, hours, "image": image.asset._ref},
  "team": *[_type == "teamMember"] | order(order asc) {name, role, department, email, phone},
  "education": *[_type == "educationPhoto"] | order(order asc) {"image": image.asset._ref, "alt": coalesce(alt, "")}
}`

// "image-<id>-<WxH>-<ext>" -> CDN adresa
let DATASET = 'production'
const img = (ref, w) => {
  if (!ref) return undefined
  const m = /^image-(.+)-(\d+x\d+)-(\w+)$/.exec(ref)
  return m ? `https://cdn.sanity.io/images/${PROJECT}/${DATASET}/${m[1]}-${m[2]}.${m[3]}?w=${w}&auto=format&q=80` : undefined
}
const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v != null && v !== '' && !(Array.isArray(v) && v.length === 0)))
const slugOf = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const fmtDate = (d) => {
  const [y, m, dd] = d.split('-')
  return `${dd}.${m}.${y}.`
}


// r = rezultat QUERY-ja
export function buildContent(r, dataset = 'production') {
  DATASET = dataset
  const deps = new Map()
  for (const m of r.team) {
    if (!deps.has(m.department)) deps.set(m.department, {id: slugOf(m.department), label: m.department, members: []})
    deps.get(m.department).members.push(clean({name: m.name, role: m.role, email: m.email, phone: m.phone}))
  }

  return {
    products: r.products.map((p) =>
      // obavezna tekstualna polja ostaju (i prazna) da sajt ne puca na nedostajućim vrijednostima
      ({
        brand: '',
        category: '',
        sku: '',
        description: '',
        ...clean({...p, image: img(p.image, 700), variants: p.variants?.map((v) => clean({name: v.name, pack: v.pack ?? '', code: v.code ?? ''}))}),
      }),
    ),
    news: r.news.map((n) => clean({...n, date: fmtDate(n.date), image: img(n.image, 1000), content: n.content ?? []})),
    brands: r.brands.map((b) => clean({name: b.name, logo: img(b.logo, 360), intro: b.intro, long: b.long})),
    franchises: r.franchises.map((f) => clean({...f, slug: slugOf(f.city), image: img(f.image, 900)})),
    team: [...deps.values()],
    education: r.education.map((e) => ({src: img(e.image, 1000), alt: e.alt})),
  }
}
