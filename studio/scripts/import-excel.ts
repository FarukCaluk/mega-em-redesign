// Uvoz proizvoda iz Excela (list "Sheet1") u Sanity. Ponovljiv: dokumenti imaju stabilan _id po Mega-Em šifri,
// a ponovni uvoz ne briše ručne izmjene (opis, slika, sakriveno).
// Probni prolaz:  DRY=1 npx sanity exec scripts/import-excel.ts --with-user-token
// Pravi uvoz:     npx sanity exec scripts/import-excel.ts --with-user-token
// Putanju do fajla može se zadati sa XLSX=putanja
import {getCliClient} from 'sanity/cli'
import XLSX from 'xlsx'
import content from '../../src/data/generated/content.json'

const FILE = process.env.XLSX ?? 'C:/Users/Korisnik/Downloads/Priprema Web Mega-Em update 20.10.2026. (1).xlsx'
const DRY = process.env.DRY === '1'
const ONLY_READY = process.env.ONLY_READY === '1' // upiši samo artikle koji su spremni za sajt

type Row = Record<string, string | number>
const wb = XLSX.readFile(FILE)
const rows = XLSX.utils.sheet_to_json<Row>(wb.Sheets['Sheet1'], {defval: ''})
const s = (v: unknown) => String(v ?? '').trim()

const slugOf = (t: string) =>
  t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)

// ispravke pravopisa u kategorijama iz Excela
const fixSub = (t: string) => (/^duploljep/i.test(t) ? 'Duploljepljiva traka' : t)
const brandOf = (b: string) => (b.toLowerCase() === 'mipa' ? 'MIPA' : b)
// ako Brend nije popunjen, pokušaj prepoznati brend po početku naziva (npr. "APEL AS50 ...")
const knownBrands = content.brands.map((b: {name: string}) => b.name).sort((a: string, b: string) => b.length - a.length)
const brandFromName = (n: string) => knownBrands.find((b: string) => n.toLowerCase().startsWith(b.toLowerCase() + ' ')) ?? ''
const nameOf = (r: Row) => s(r['Novi naziv']) || s(r['Naziv'])
const prepared = (r: Row) => Boolean(s(r['Katalog']) || s(r['Primarna kategorija']))

const words = (t: string) => t.toLowerCase().split(/\s+/).slice(0, 3).join(' ')
const sameFamily = (r: Row, head: Row) =>
  nameOf(r).toLowerCase().startsWith(s(head['Katalog']).toLowerCase()) || words(nameOf(r)) === words(nameOf(head))

// grupe: red sa "Katalog" otvara grupu; redovi iza njega čiji naziv počinje tim nazivom su njene varijante; ostali redovi su zasebni artikli
type Group = {head: Row; items: Row[]}
const groups: Group[] = []
let cur: Group | null = null
for (const r of rows) {
  if (s(r['Katalog'])) {
    cur = {head: r, items: [r]}
    groups.push(cur)
  } else if (cur && !s(r['Primarna kategorija']) && sameFamily(r, cur.head)) {
    cur.items.push(r)
  } else {
    cur = null
    groups.push({head: r, items: [r]})
  }
}

const usedSlugs = new Set<string>()
const docs = groups.map((g) => {
  const h = g.head
  const isGroup = g.items.length > 1
  const sku = s(h['Šifra'])
  const name = s(h['Katalog']) || nameOf(h)
  let slug = slugOf(name) || slugOf(sku)
  if (usedSlugs.has(slug)) slug = `${slug}-${slugOf(sku)}`
  usedSlugs.add(slug)
  const hidden = !prepared(h)
  return {
    _id: `xl-${slugOf(sku)}`,
    _type: 'product',
    name,
    slug: {_type: 'slug', current: slug},
    sku,
    brand: brandOf(s(h['Brend'])) || brandFromName(name),
    categoryTitle: s(h['Primarna kategorija']),
    subcategoryTitle: fixSub(s(h['Sekundarna kategorija'])),
    supplierName: s(h['Dobavljač 1']),
    supplierCode: isGroup ? '' : s(h['Šifra dobavljača']),
    onlineCode: isGroup ? '' : s(h['Online šifra']),
    hidden,
    variants: isGroup
      ? g.items.map((r, i) => ({_type: 'variant', _key: `v${i}`, name: nameOf(r), code: s(r['Online šifra']), supplierCode: s(r['Šifra dobavljača'])}))
      : undefined,
  }
})

const visible = docs.filter((d) => !d.hidden)
console.log(`redova: ${rows.length}, artikala: ${docs.length}, vidljivo na sajtu: ${visible.length}, sakriveno: ${docs.length - visible.length}`)
console.log(`grupa sa varijantama: ${docs.filter((d) => d.variants).length}`)
const cats: Record<string, number> = {}
visible.forEach((d) => (cats[d.categoryTitle || '(bez kategorije)'] = (cats[d.categoryTitle || '(bez kategorije)'] || 0) + 1))
console.log('kategorije (vidljivi):', JSON.stringify(cats))
const bad = visible.filter((d) => !d.brand || !d.categoryTitle)
console.log(`vidljivi bez brenda ili kategorije: ${bad.length}`, bad.slice(0, 5).map((d) => d.name))

async function run() {
  if (DRY) return console.log('DRY: ništa nije upisano')
  const client = getCliClient({apiVersion: '2025-01-01'})
  const clean = (o: unknown) => JSON.parse(JSON.stringify(o, (_k, v) => (v === '' ? undefined : v)))
  const toWrite = ONLY_READY ? docs.filter((d) => !d.hidden) : docs
  for (let i = 0; i < toWrite.length; i += 200) {
    const tx = client.transaction()
    for (const d of toWrite.slice(i, i + 200)) {
      const doc = clean(d)
      const {categoryTitle, subcategoryTitle} = doc
      delete doc.categoryTitle
      delete doc.subcategoryTitle
      if (categoryTitle) {
        const cid = `category-${slugOf(categoryTitle)}`
        tx.createIfNotExists({_id: cid, _type: 'category', title: categoryTitle})
        doc.category = {_type: 'reference', _ref: cid}
        if (subcategoryTitle) {
          const sid = `subcategory-${slugOf(categoryTitle)}-${slugOf(subcategoryTitle)}`
          tx.createIfNotExists({_id: sid, _type: 'subcategory', title: subcategoryTitle, category: {_type: 'reference', _ref: cid}})
          doc.subcategory = {_type: 'reference', _ref: sid}
        }
      }
      // novi artikal se napravi; postojećem se osvježe samo podaci iz Excela (opis, slika i "sakriveno" ostaju kako ih je uredio klijent)
      const {_id, _type, slug, hidden, ...excelFields} = doc
      tx.createIfNotExists(doc)
      tx.patch(_id, {set: excelFields})
    }
    await tx.commit()
    console.log(`upisano ${Math.min(i + 200, toWrite.length)}/${toWrite.length}`)
  }
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
