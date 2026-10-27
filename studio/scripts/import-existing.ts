// Jednokratni uvoz postojećeg sadržaja sajta u Sanity.
// Pokretanje (iz foldera studio/): npx sanity exec scripts/import-existing.ts --with-user-token
import {readFileSync, existsSync} from 'node:fs'
import {resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {products} from '../../src/data/products'
import {newsPosts} from '../../src/data/news'
import {brands} from '../../src/data/brands'
import {franchises} from '../../src/data/franchises'
import {departments} from '../../src/data/team'

const client = getCliClient({apiVersion: '2025-01-01'})
const publicDir = resolve(process.cwd(), '../public')
const uploaded = new Map<string, {_type: 'image'; asset: {_type: 'reference'; _ref: string}}>()

async function img(path?: string) {
  if (!path) return undefined
  const cached = uploaded.get(path)
  if (cached) return cached
  const file = resolve(publicDir, path.replace(/^\//, ''))
  if (!existsSync(file)) {
    console.warn('nema fajla:', file)
    return undefined
  }
  const asset = await client.assets.upload('image', readFileSync(file), {filename: file.split(/[\\/]/).pop()})
  const ref = {_type: 'image' as const, asset: {_type: 'reference' as const, _ref: asset._id}}
  uploaded.set(path, ref)
  return ref
}

const slugOf = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const isoDate = (d: string) => {
  const [dd, mm, yy] = d.replace(/\.$/, '').split('.')
  return `${yy}-${mm}-${dd}`
}

const block = (text: string, i: number) => ({
  _type: 'block',
  _key: `b${i}`,
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: `s${i}`, text, marks: []}],
})

async function run() {
  const docs: Record<string, unknown>[] = []

  for (const p of products) {
    docs.push({
      _id: `product-${p.id}`,
      _type: 'product',
      name: p.name,
      slug: {_type: 'slug', current: p.id},
      sku: p.sku,
      brand: p.brand,
      category: p.category,
      supplierName: p.supplierName,
      supplierCode: p.supplierCode,
      manufacturer: p.manufacturer,
      image: await img(p.image),
      intro: p.intro,
      description: p.description,
      variants: p.variants?.map((v, i) => ({_type: 'variant', _key: `v${i}`, ...v})),
      packSize: p.packSize,
      onlineCode: p.onlineCode,
    })
  }

  for (const [i, n] of newsPosts.entries()) {
    docs.push({
      _id: `news-${n.slug}`,
      _type: 'newsPost',
      title: n.title,
      slug: {_type: 'slug', current: n.slug},
      date: isoDate(n.date),
      category: n.category,
      pinned: i === 0,
      image: await img(n.image),
      excerpt: n.excerpt,
      content: n.content.map(block),
    })
  }

  for (const [i, b] of brands.entries()) {
    docs.push({_id: `brand-${slugOf(b.name)}`, _type: 'brand', name: b.name, logo: await img(b.logo), intro: b.intro, long: b.long, order: i + 1})
  }

  for (const [i, f] of franchises.entries()) {
    docs.push({
      _id: `franchise-${f.slug}`,
      _type: 'franchise',
      name: f.name,
      city: f.city,
      address: f.address,
      phone: f.phone,
      email: f.email,
      hours: f.hours,
      image: await img(f.image),
      order: i + 1,
    })
  }

  let t = 0
  for (const d of departments) {
    for (const m of d.members) {
      t++
      docs.push({_id: `team-${d.id}-${slugOf(m.name)}`, _type: 'teamMember', name: m.name, role: m.role, department: d.label, email: m.email, phone: m.phone, order: t})
    }
  }

  const edu = [
    ['trening-centar/trening-centar-ulaz.webp', 'Ulaz u Mega-Em edukacijski centar'],
    ['trening-centar/trening-centar-gosti.webp', 'Gosti na otvorenju edukacijskog centra'],
    ['trening-centar/edu-1.webp', 'Polaznici edukacije o auto detailingu sa certifikatima'],
    ['trening-centar/edu-2.webp', 'Polaznici sa certifikatima i poklon vrećicama'],
    ['trening-centar/edu-3.webp', 'Grupa polaznika sa certifikatima u edukacijskom centru'],
    ['trening-centar/edu-4.webp', 'Praktični rad u lakirnici'],
    ['trening-centar/edu-5.webp', 'Demonstracija pripreme površine u lakirnici'],
    ['trening-centar/edu-6.webp', 'Demonstracija koloristike na haubi vozila'],
  ]
  for (const [i, [src, alt]] of edu.entries()) {
    docs.push({_id: `edu-${i + 1}`, _type: 'educationPhoto', image: await img('/images/' + src), alt, order: i + 1})
  }

  const clean = (o: Record<string, unknown>) => JSON.parse(JSON.stringify(o)) // izbaci undefined
  for (let i = 0; i < docs.length; i += 100) {
    const tx = client.transaction()
    for (const d of docs.slice(i, i + 100)) tx.createOrReplace(clean(d) as {_id: string; _type: string})
    await tx.commit()
    console.log(`upisano ${Math.min(i + 100, docs.length)}/${docs.length}`)
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
