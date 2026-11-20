// Uvoz proizvoda iz kataloga "Web import" (Excel) u Sanity.
// Probni prolaz (ništa se ne upisuje):  DRY=1 npx sanity exec scripts/import-web.ts --with-user-token
// Pravi uvoz:                           npx sanity exec scripts/import-web.ts --with-user-token
// Pravila: COOL proizvodi i redovi označeni narandžastom ili žutom bojom se preskaču; duplikati se ne uvoze;
// varijante su ISKLJUČIVO redovi koji su u koloni "Naziv katalog" spojeni u jednu ćeliju (jedan artikal, tabela varijanti).
// Artikal bez online šifre dobija redni broj 01, 02, 03 ...
// Podrazumijevani režim je DODAVANJE: postoji li artikal (po šifri, ID-u ili nazivu), preskače se i ništa se ne briše ni prepisuje
// (slike i opisi koje je klijent dodao u Studiju ostaju). MODE=replace je potpuna zamjena kataloga: briše i prepisuje sve iz Excela
// i artikle kojih nema u Excelu, ali SAČUVA sliku, opis, uvodnu rečenicu i oznaku "Novo u ponudi" artikala koji se ponovo uvoze.
// Dataset: DATASET=review za pregled prije objave (podrazumijevano production).
import {getCliClient} from 'sanity/cli'
import {deployPaused} from './deploy'
import XLSX from 'xlsx'

const FILE = process.env.XLSX ?? 'C:/Users/Korisnik/Downloads/Copy of Web import final 16.11.2026. update (1).xlsx'
const DRY = process.env.DRY === '1'
const DATASET = process.env.DATASET ?? 'production'
const REPLACE = process.env.MODE === 'replace'
const FILLS: Record<string, string> = {F6C6AD: 'narandžasto', F4B183: 'narandžasto', FFFF00: 'žuto'} // redovi ovih boja se ne uvoze

const t = (v: unknown) => String(v ?? '').replace(/\s+/g, ' ').trim()
const slugOf = (x: string) =>
  x.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)

// ---------- čitanje ----------
const wb = XLSX.readFile(FILE, {cellStyles: true})
const ws = wb.Sheets[process.env.SHEET ?? wb.SheetNames[0]]
const range = XLSX.utils.decode_range(ws['!ref']!)
const cell = (r: number, c: number) => ws[XLSX.utils.encode_cell({r, c})]
const header = Array.from({length: range.e.c + 1}, (_, c) => t(cell(0, c)?.v))
type Row = Record<string, string> & {__r?: never}
const rows: (Row & {r: number})[] = []
const skipped: Record<string, number> = {narandžasto: 0, žuto: 0}
let skippedCool = 0
const isCool = (o: Record<string, string>) => /^cool\b/i.test(o['Naziv'] ?? '') || /^cool\b/i.test(o['Novi naziv'] ?? '') || /^cool\b/i.test(o['Naziv katalog'] ?? '') || /^cool$/i.test(o['Brend'] ?? '')
for (let r = 1; r <= Math.min(range.e.r, 20000); r++) {
  if (!t(cell(r, 0)?.v) && !t(cell(r, 1)?.v)) continue
  const fill = cell(r, 0)?.s?.fgColor?.rgb || cell(r, 1)?.s?.fgColor?.rgb || ''
  if (FILLS[fill]) {
    skipped[FILLS[fill]]++
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

// ---------- varijante: samo redovi spojeni u koloni "Naziv katalog" (D) ----------
const mergeId = new Map<number, number>() // red -> redni broj spojene ćelije
const mergeName = new Map<number, string>() // redni broj -> naziv iz spojene ćelije
;(ws['!merges'] ?? []).forEach((m, i) => {
  if (m.s.c !== 3 || m.e.c !== 3 || m.e.r <= m.s.r) return
  mergeName.set(i, t(cell(m.s.r, 3)?.v))
  for (let r = m.s.r; r <= m.e.r; r++) mergeId.set(r, i)
})

type Item = {row: Row; name: string; r: number; online: string; pack: string}
// online šifra i broj komada; ako je online šifra greškom upisana u kolonu "Broj komada" (npr. OS043), prebaci je
const OFF = /^[A-Za-z]{2,}\d+$/
const items: Item[] = rows.map((row) => {
  let online = col(row, 'Online')
  let pack = col(row, 'Broj komada')
  if (!online && OFF.test(pack)) [online, pack] = [pack, '']
  return {row, r: row.r, name: col(row, 'Novi naziv') || col(row, 'Naziv'), online, pack}
})

// dedupe: ista šifra (ako je ima) ili isti naziv
const seenSku = new Set<string>()
const seenName = new Map<string, string>()
const unique: Item[] = []
const duplicates: string[] = []
for (const it of items) {
  const sku = col(it.row, 'Šifra')
  const key = it.name.toLowerCase()
  if ((sku && seenSku.has(sku)) || seenName.has(key)) {
    duplicates.push(`${it.name} [${sku || '-'} / ${it.online || '-'}] = već uvezeno kao [${seenName.get(key) ?? sku}]`)
    continue
  }
  if (sku) seenSku.add(sku)
  seenName.set(key, `${sku || '-'} / ${it.online || '-'}`)
  unique.push(it)
}

// artikal bez online šifre dobija redni broj 01, 02, 03 ...
let counter = 0
const noOnline: string[] = []
for (const it of unique) {
  if (!it.online) {
    it.online = String(++counter).padStart(2, '0')
    noOnline.push(`${it.name} -> ${it.online}`)
  }
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
const usedIds = new Set<string>()
const docs = [...groups.values()].map((g) => {
  const first = g.items[0]
  const h = first.row
  const multi = g.items.length > 1
  const name = multi ? g.title || first.name : first.name
  const sku = col(h, 'Šifra')
  // ID: šifra Mega-Em; ako je nema, online šifra; ako ni nje nema, broj reda u Excelu
  let _id = `web-${slugOf(sku || first.online) || 'r' + first.r}`
  if (usedIds.has(_id)) _id = `${_id}-r${first.r}`
  usedIds.add(_id)
  return {
    _id,
    _type: 'product',
    name,
    sku,
    brandName: col(h, 'Brend'),
    categoryTitle: cat(col(h, 'Primarna')),
    subcategoryTitle: cat(col(h, 'Sekundarna')),
    tertiaryTitle: cat(col(h, 'Tercijalna')),
    packSize: multi ? '' : first.pack,
    onlineCode: multi ? '' : first.online,
    variants: multi ? g.items.map((it, i) => ({_type: 'variant', _key: `v${i}`, name: it.name, pack: it.pack, code: it.online})) : undefined,
  }
})

console.log(`redova: ${rows.length + skipped['narandžasto'] + skipped['žuto'] + skippedCool}, preskočeno: narandžasto ${skipped['narandžasto']}, žuto ${skipped['žuto']}, COOL ${skippedCool}; duplikata: ${duplicates.length}`)
console.log(`artikala za uvoz: ${docs.length}, od toga sa varijantama: ${docs.filter((d) => d.variants).length} (pokriva ${docs.filter((d) => d.variants).reduce((a, d) => a + (d.variants?.length ?? 0), 0)} redova)`)
console.log('duplikati (preskočeni):', duplicates)
console.log('bez online šifre (dobili redni broj):', noOnline)
console.log('bez šifre Mega-Em:', docs.filter((d) => !d.sku).length, '| bez brenda:', docs.filter((d) => !d.brandName).length, '| bez kategorije:', docs.filter((d) => !d.categoryTitle).length)
const big = docs.filter((d) => d.variants).sort((a, b) => (b.variants?.length ?? 0) - (a.variants?.length ?? 0))
big.slice(0, 8).forEach((d) => console.log(`  ${d.name} -> ${d.variants?.length} varijanti: ${d.variants?.slice(0, 2).map((v) => v.name).join(' | ')}`))
console.log('uzorak pojedinačnih:', docs.filter((d) => !d.variants).slice(0, 6).map((d) => d.name))

const norm = (n: string) => n.toLowerCase().replace(/[^a-z0-9]/g, '')
const brandAlias: Record<string, string> = {kraus: 'krauss'}
const SKIP_BRANDS = new Set(['x']) // nepoznata oznaka "X" u katalogu, ne uvozi se kao brend

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'}).withConfig({dataset: DATASET})
  const commit = async (build: (tx: ReturnType<typeof client.transaction>) => void) => {
    const tx = client.transaction()
    build(tx)
    await tx.commit()
  }
  console.log(REPLACE ? 'REŽIM: potpuna zamjena (MODE=replace)' : 'REŽIM: samo dodavanje novih artikala (postojeći se ne diraju)')

  // ---- priprema (ništa se ne upisuje) ----
  // brendovi: postojeći po nazivu, nepoznati se prave bez prikaza na stranici Brendovi
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

  // kategorije, podkategorije, tercijarne kategorije
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

  const have: {_id: string; sku?: string; name?: string}[] = await client.fetch('*[_type=="product"]{_id, sku, name}')
  // u režimu zamjene slobodni su svi slugovi (sve se briše), u režimu dodavanja zauzeti su postojeći
  const usedSlugs = new Set<string>(REPLACE ? [] : await client.fetch('*[_type=="product"].slug.current'))
  let toWrite = docs
  if (!REPLACE) {
    const ids = new Set(have.map((h) => h._id))
    const skus = new Set(have.map((h) => h.sku).filter(Boolean))
    const names = new Set(have.map((h) => (h.name ?? '').toLowerCase()))
    toWrite = docs.filter((d) => !ids.has(d._id) && !(d.sku && skus.has(d.sku)) && !names.has(d.name.toLowerCase()))
    console.log(`već postoji (preskočeno): ${docs.length - toWrite.length}, novih za dodavanje: ${toWrite.length}`)
    console.log('novi artikli (prvih 10):', toWrite.slice(0, 10).map((d) => d.name))
  }

  // u režimu zamjene čuvamo ono što je klijent ručno dodao (slika, opisi, oznaka "Novo u ponudi")
  const KEEP = ['image', 'intro', 'description', 'newInOffer', 'hidden', 'supplierName', 'manufacturer']
  const kept = new Map<string, Record<string, unknown>>()
  if (REPLACE) {
    const manual: Record<string, unknown>[] = await client.fetch('*[_type=="product" && !(_id in path("drafts.**")) && (defined(image) || defined(intro) || (defined(description) && description != "") || newInOffer == true || hidden == true)]')
    for (const m of manual) kept.set(m._id as string, Object.fromEntries(KEEP.filter((k) => m[k] != null && m[k] !== '' && !(k === 'hidden' && m[k] === false)).map((k) => [k, m[k]])))
  }

  const prodDocs = toWrite.map((d) => {
    let slug = slugOf(d.name) || slugOf(d.sku)
    if (usedSlugs.has(slug)) slug = `${slug}-${slugOf(d.sku || d.onlineCode) || d._id}`
    usedSlugs.add(slug)
    const {brandName, categoryTitle, subcategoryTitle, tertiaryTitle, ...rest} = d
    const doc: Record<string, unknown> = {...rest, slug: {_type: 'slug', current: slug}, hidden: false, ...catDocs(categoryTitle, subcategoryTitle, tertiaryTitle), ...(kept.get(d._id) ?? {})}
    const b = brandName ? brandRef(brandName) : undefined
    if (b) doc.brand = b
    return JSON.parse(JSON.stringify(doc, (_k, v) => (v === '' ? undefined : v)))
  })

  const idsNew = new Set(prodDocs.map((d) => d._id))
  console.log(`brendova novih (prave se skriveni): ${newBrands.size}`, [...newBrands.values()])
  console.log(`kategorija/podkategorija/tercijarnih (ukupno u Excelu): ${cats.size}`)
  if (REPLACE) {
    const published = have.filter((h) => !h._id.startsWith('drafts.'))
    const gone = published.filter((h) => !idsNew.has(h._id))
    console.log(`zamjena: trenutno u bazi ${published.length} (+ ${have.length - published.length} nacrta koji se brišu), novih ${prodDocs.length}; brišu se artikli kojih nema u Excelu: ${gone.length}`)
    console.log('čuva se ručno dodano za artikle:', [...kept.keys()].filter((id) => idsNew.has(id)), '| ručno dodano na artiklima koji se brišu:', [...kept.keys()].filter((id) => !idsNew.has(id)))
    console.log('artikli koji se brišu (prvih 25):', gone.slice(0, 25).map((h) => `${h.sku ?? '-'} ${h.name}`))
  }
  if (DRY) return console.log('DRY: ništa nije upisano')

  // ---- upis ----
  // 1) samo u režimu zamjene: obriši prethodni Excel uvoz
  if (REPLACE) {
    const oldIds: string[] = await client.fetch('*[_type=="product" && (_id match "xl-*" || _id match "web-*")]._id')
    for (let k = 0; k < oldIds.length; k += 200) await commit((tx) => oldIds.slice(k, k + 200).forEach((id) => tx.delete(id)))
    console.log('obrisano prethodnog uvoza:', oldIds.length)
  }

  // brend SIA se uklanja iz Brendova na zahtjev klijenta
  const sia: string[] = REPLACE ? await client.fetch('*[_type=="brand" && lower(name)=="sia"]._id') : []
  for (const id of sia) {
    // ručno unesene SIA artikle ne diramo, samo im skidamo brend
    const refs: string[] = await client.fetch('*[references($id)]._id', {id})
    for (const r of refs) await client.patch(r).unset(['brand']).commit()
    await client.delete(id)
  }
  if (REPLACE) console.log('obrisan brend SIA:', sia.length)

  // brendovi i kategorije prvi, da reference postoje
  await commit((tx) => {
    for (const [id, name] of newBrands) tx.createIfNotExists({_id: id, _type: 'brand', name, showOnBrandsPage: false, order: 1000})
    for (const doc of cats.values()) tx.createIfNotExists(doc as {_id: string; _type: string})
  })
  console.log(`brendova novih: ${newBrands.size}, kategorija/podkategorija/tercijarnih: ${cats.size}`)

  for (let k = 0; k < prodDocs.length; k += 250) {
    await commit((tx) => prodDocs.slice(k, k + 250).forEach((d) => tx.createIfNotExists(d)))
    console.log(`upisano ${Math.min(k + 250, prodDocs.length)}/${prodDocs.length}`)
  }

  // 2) samo u režimu zamjene: artikli kojih nema u Excelu se brišu
  if (REPLACE) {
    const stray: string[] = (await client.fetch('*[_type=="product"]._id')).filter((id: string) => !idsNew.has(id))
    for (let k = 0; k < stray.length; k += 200) await commit((tx) => stray.slice(k, k + 200).forEach((id) => tx.delete(id)))
    console.log('obrisano artikala kojih nema u Excelu:', stray.length)

    // 3) obriši kategorije koje više nijedan artikal ne koristi
    for (const type of ['tertiaryCategory', 'subcategory', 'category']) {
      const unused: string[] = await client.fetch('*[_type==$t && count(*[references(^._id)])==0]._id', {t: type})
      if (unused.length) await commit((tx) => unused.forEach((id) => tx.delete(id)))
      console.log('obrisano nekorištenih (' + type + '):', unused.length)
    }
  }
}
deployPaused(run, {skip: DRY}).catch((e) => {
  console.error(e)
  process.exit(1)
})
