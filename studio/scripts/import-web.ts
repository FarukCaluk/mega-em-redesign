// Uvoz proizvoda iz kataloga "Web import" (Excel) u Sanity.
// Probni prolaz (ništa se ne upisuje):  DRY=1 npx sanity exec scripts/import-web.ts --with-user-token
// Pravi uvoz:                           npx sanity exec scripts/import-web.ts --with-user-token
// Pravila: COOL proizvodi i redovi označeni narandžastom bojom se preskaču; duplikati se ne uvoze;
// varijante su ISKLJUČIVO redovi koji su u koloni Katalog spojeni u jednu ćeliju (jedan artikal, tabela varijanti).
// Artikli kojih nema u Excelu se brišu.
// Dataset: DATASET=review za pregled prije objave (podrazumijevano production).
import {getCliClient} from 'sanity/cli'
import XLSX from 'xlsx'

const FILE = process.env.XLSX ?? 'C:/Users/Korisnik/Downloads/Web import 4.11.2026. (2).xlsx'
const DRY = process.env.DRY === '1'
const DATASET = process.env.DATASET ?? 'production'
const ORANGE = 'F6C6AD'

const t = (v: unknown) => String(v ?? '').replace(/\s+/g, ' ').trim()
const slugOf = (x: string) =>
  x.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)

// ---------- čitanje ----------
const wb = XLSX.readFile(FILE, {cellStyles: true})
const ws = wb.Sheets['Sheet1']
const range = XLSX.utils.decode_range(ws['!ref']!)
const cell = (r: number, c: number) => ws[XLSX.utils.encode_cell({r, c})]
const header = Array.from({length: 11}, (_, c) => t(cell(0, c)?.v))
type Row = Record<string, string> & {__r?: never}
const rows: (Row & {r: number})[] = []
let skippedOrange = 0
let skippedCool = 0
const isCool = (o: Record<string, string>) => /^cool\b/i.test(o['Naziv'] ?? '') || /^cool\b/i.test(o['Novi naziv'] ?? '') || /^cool\b/i.test(o['Katalog'] ?? '') || /^cool$/i.test(o['Brend'] ?? '')
for (let r = 1; r <= Math.min(range.e.r, 20000); r++) {
  if (!t(cell(r, 0)?.v) && !t(cell(r, 1)?.v)) continue
  const fill = cell(r, 0)?.s?.fgColor?.rgb || cell(r, 1)?.s?.fgColor?.rgb || ''
  if (fill === ORANGE) {
    skippedOrange++
    continue
  }
  const o: Row = {}
  header.forEach((h, c) => (o[h] = t(cell(r, c)?.v)))
  if (isCool(o)) {
    skippedCool++
    continue
  }
  rows.push({...o, r})
}
const col = (r: Row, name: string) => r[header.find((h) => h.toLowerCase().startsWith(name.toLowerCase())) ?? ''] ?? ''

// ---------- ispravke pravopisa i naziva ----------
const fixCat: Record<string, string> = {
  'brusni prohram': 'Brusni program',
  'razrjeđivač': 'Razrjeđivači',
  'duploljepiva traka': 'Duploljepljiva traka',
  'duploljepliva traka': 'Duploljepljiva traka',
  'osvježivać': 'Osvježivač',
}
const cat = (v: string) => (v && !/^\d+$/.test(v) ? fixCat[v.toLowerCase()] ?? v : '')

// ---------- varijante: samo redovi spojeni u koloni Katalog (D) ----------
const mergeId = new Map<number, number>() // red -> redni broj spojene ćelije
const mergeName = new Map<number, string>() // redni broj -> naziv iz spojene ćelije
;(ws['!merges'] ?? []).forEach((m, i) => {
  if (m.s.c !== 3 || m.e.c !== 3 || m.e.r <= m.s.r) return
  mergeName.set(i, t(cell(m.s.r, 3)?.v))
  for (let r = m.s.r; r <= m.e.r; r++) mergeId.set(r, i)
})

type Item = {row: Row; name: string; r: number}
const items: Item[] = rows.map((row) => ({row, r: row.r, name: col(row, 'Novi naziv') || col(row, 'Naziv')}))

// dedupe: ista šifra ili isti naziv
const seenSku = new Set<string>()
const seenName = new Set<string>()
const unique: Item[] = []
const duplicates: string[] = []
for (const it of items) {
  const sku = col(it.row, 'Šifra')
  const key = it.name.toLowerCase()
  if (seenSku.has(sku) || seenName.has(key)) {
    duplicates.push(it.name)
    continue
  }
  seenSku.add(sku)
  seenName.add(key)
  unique.push(it)
}

type Group = {key: string; title?: string; items: Item[]}
const groups = new Map<string, Group>()
for (const it of unique) {
  const m = mergeId.get(it.r)
  const key = m !== undefined ? 'm' + m : 'r' + it.r
  const g = groups.get(key) ?? {key, title: m !== undefined ? mergeName.get(m) : undefined, items: []}
  g.items.push(it)
  groups.set(key, g)
}

// ---------- dokumenti ----------
const docs = [...groups.values()].map((g) => {
  const h = g.items[0].row
  const multi = g.items.length > 1
  const name = multi ? g.title || g.items[0].name : g.items[0].name
  return {
    _id: `web-${slugOf(col(h, 'Šifra'))}`,
    _type: 'product',
    name,
    sku: col(h, 'Šifra'),
    brandName: col(h, 'Brend'),
    categoryTitle: cat(col(h, 'Primarna')),
    subcategoryTitle: cat(col(h, 'Sekundarna')),
    tertiaryTitle: cat(col(h, 'Tercijalna')),
    supplierCode: multi ? '' : col(h, 'Šifra dobavljača'),
    packSize: multi ? '' : col(h, 'Broj komada'),
    onlineCode: multi ? '' : col(h, 'Online'),
    variants: multi
      ? g.items.map((it, i) => ({_type: 'variant', _key: `v${i}`, name: it.name, pack: col(it.row, 'Broj komada'), code: col(it.row, 'Online'), supplierCode: col(it.row, 'Šifra dobavljača')}))
      : undefined,
  }
})

console.log(`redova: ${rows.length + skippedOrange + skippedCool}, preskočeno (narandžasto): ${skippedOrange}, preskočeno (COOL): ${skippedCool}, duplikata: ${duplicates.length}`)
console.log(`artikala za uvoz: ${docs.length}, od toga sa varijantama: ${docs.filter((d) => d.variants).length} (pokriva ${docs.filter((d) => d.variants).reduce((a, d) => a + (d.variants?.length ?? 0), 0)} redova)`)
console.log('duplikati:', duplicates.slice(0, 5))
console.log('bez brenda:', docs.filter((d) => !d.brandName).length, '| bez kategorije:', docs.filter((d) => !d.categoryTitle).length)
const big = docs.filter((d) => d.variants).sort((a, b) => (b.variants?.length ?? 0) - (a.variants?.length ?? 0))
big.slice(0, 8).forEach((d) => console.log(`  ${d.name} -> ${d.variants?.length} varijanti: ${d.variants?.slice(0, 2).map((v) => v.name).join(' | ')}`))
console.log('uzorak pojedinačnih:', docs.filter((d) => !d.variants).slice(0, 6).map((d) => d.name))

const norm = (n: string) => n.toLowerCase().replace(/[^a-z0-9]/g, '')
const brandAlias: Record<string, string> = {kraus: 'krauss'}
const SKIP_BRANDS = new Set(['x']) // nepoznata oznaka "X" u katalogu, ne uvozi se kao brend


async function run() {
  if (DRY) return console.log('DRY: ništa nije upisano')
  const client = getCliClient({apiVersion: '2025-01-01'}).withConfig({dataset: DATASET})
  const commit = async (build: (tx: ReturnType<typeof client.transaction>) => void) => {
    const tx = client.transaction()
    build(tx)
    await tx.commit()
  }

  // 1) obriši prethodni Excel uvoz (zamjenjuje ga ovaj noviji katalog)
  const oldIds: string[] = await client.fetch('*[_type=="product" && (_id match "xl-*" || _id match "web-*")]._id')
  for (let k = 0; k < oldIds.length; k += 200) await commit((tx) => oldIds.slice(k, k + 200).forEach((id) => tx.delete(id)))
  console.log('obrisano prethodnog uvoza:', oldIds.length)

  // brend SIA se uklanja iz Brendova na zahtjev klijenta
  const sia: string[] = await client.fetch('*[_type=="brand" && lower(name)=="sia"]._id')
  for (const id of sia) {
    // ručno unesene SIA artikle ne diramo, samo im skidamo brend
    const refs: string[] = await client.fetch('*[references($id)]._id', {id})
    for (const r of refs) await client.patch(r).unset(['brand']).commit()
    await client.delete(id)
  }
  console.log('obrisan brend SIA:', sia.length)

  // 2) brendovi: postojeći po nazivu, nepoznati se prave bez prikaza na stranici Brendovi
  const existing: {_id: string; name: string}[] = await client.fetch('*[_type=="brand"]{_id, name}')
  const brandId = new Map(existing.map((b) => [norm(b.name), b._id]))
  const newBrands = new Map<string, string>()
  const brandRef = (name: string) => {
    const key = norm(brandAlias[name.toLowerCase()] ?? name)
    if (!key || SKIP_BRANDS.has(name.toLowerCase())) return undefined
    let id = brandId.get(key)
    if (!id) {
      id = `brand-${slugOf(name)}`
      brandId.set(key, id)
      newBrands.set(id, name)
    }
    return {_type: 'reference', _ref: id}
  }

  // 3) kategorije, podkategorije, tercijarne kategorije
  const cats = new Map<string, Record<string, unknown>>()
  const refTo = (id: string) => ({_type: 'reference', _ref: id})
  const catDocs = (cT: string, sT: string, tT: string) => {
    const out: {category?: unknown; subcategory?: unknown; tertiaryCategory?: unknown} = {}
    if (!cT) return out
    const cid = `category-${slugOf(cT)}`
    cats.set(cid, {_id: cid, _type: 'category', title: cT})
    out.category = refTo(cid)
    if (sT) {
      const sid = `subcategory-${slugOf(cT)}-${slugOf(sT)}`
      cats.set(sid, {_id: sid, _type: 'subcategory', title: sT, category: refTo(cid)})
      out.subcategory = refTo(sid)
      if (tT) {
        const tid = `tertiary-${slugOf(cT)}-${slugOf(sT)}-${slugOf(tT)}`
        cats.set(tid, {_id: tid, _type: 'tertiaryCategory', title: tT, subcategory: refTo(sid)})
        out.tertiaryCategory = refTo(tid)
      }
    }
    return out
  }

  const usedSlugs = new Set<string>(await client.fetch('*[_type=="product"].slug.current'))
  const prodDocs = docs.map((d) => {
    let slug = slugOf(d.name) || slugOf(d.sku)
    if (usedSlugs.has(slug)) slug = `${slug}-${slugOf(d.sku)}`
    usedSlugs.add(slug)
    const {brandName, categoryTitle, subcategoryTitle, tertiaryTitle, ...rest} = d
    const doc: Record<string, unknown> = {...rest, slug: {_type: 'slug', current: slug}, hidden: false, ...catDocs(categoryTitle, subcategoryTitle, tertiaryTitle)}
    const b = brandName ? brandRef(brandName) : undefined
    if (b) doc.brand = b
    return JSON.parse(JSON.stringify(doc, (_k, v) => (v === '' ? undefined : v)))
  })

  // brendovi i kategorije prvi, da reference postoje
  await commit((tx) => {
    for (const [id, name] of newBrands) tx.createIfNotExists({_id: id, _type: 'brand', name, showOnBrandsPage: false, order: 1000})
    for (const doc of cats.values()) tx.createIfNotExists(doc as {_id: string; _type: string})
  })
  console.log(`brendova novih: ${newBrands.size}, kategorija/podkategorija/tercijarnih: ${cats.size}`)

  for (let k = 0; k < prodDocs.length; k += 250) {
    await commit((tx) => prodDocs.slice(k, k + 250).forEach((d) => tx.createOrReplace(d)))
    console.log(`upisano ${Math.min(k + 250, prodDocs.length)}/${prodDocs.length}`)
  }

  // 4) artikli kojih nema u Excelu (ručno uneseni ranije) se brišu
  const keep = new Set(prodDocs.map((d) => d._id))
  const stray: string[] = (await client.fetch('*[_type=="product"]._id')).filter((id: string) => !keep.has(id))
  for (let k = 0; k < stray.length; k += 200) await commit((tx) => stray.slice(k, k + 200).forEach((id) => tx.delete(id)))
  console.log('obrisano artikala kojih nema u Excelu:', stray.length)

  // 5) obriši kategorije koje više nijedan artikal ne koristi
  for (const type of ['tertiaryCategory', 'subcategory', 'category']) {
    const unused: string[] = await client.fetch('*[_type==$t && count(*[references(^._id)])==0]._id', {t: type})
    if (unused.length) await commit((tx) => unused.forEach((id) => tx.delete(id)))
    console.log('obrisano nekorištenih (' + type + '):', unused.length)
  }
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
